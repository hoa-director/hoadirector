import {
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Op,
  HasManyCreateAssociationMixin
} from 'sequelize';
import * as moment from 'moment';
import * as Bluebird from 'bluebird';

import { Unit } from './unit';
import { User } from './user';
import { RuleList } from './rule-list';
import { Rule } from './rule';
import { Objection } from './objection';

export class Association extends Model {
  id: number;
  name: string;
  objectionVoteTime: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  ruleLists: RuleList[];

  objectionId: number;
  objections: Objection[];
  getObjections: HasManyGetAssociationsMixin<Objection>;
  addObjection: HasManyAddAssociationMixin<Objection, number>;
  createObjection: HasManyCreateAssociationMixin<Objection>;

  units: Unit[];

  public static getDirectoryByAssociationId(associationId: number) {
    return new Promise((resolve, reject) => {
      Association.find({
        where: { id: associationId },
        attributes: ['name'],
        include: [
          {
            model: Unit,
            as: 'units',
            attributes: [
              'addressLineOne',
              'addressLineTwo',
              'city',
              'state',
              'zip'
            ],
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName', 'email', 'number']
              }
            ]
          }
        ]
      })
        .then(association => {
          resolve(association);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public static getUsersByAssociationId(associationId: number): Bluebird<User[]> {
    return Association.find({
      where: { id: associationId },
      include: [
        {
          model: Unit,
          as: 'units',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['email']
            }
          ]
        }
      ]
    })
    .then(association => {
      const users = association.units.map(unit => {
        return unit.user;
      })
      return users;
    })
  }

  public static getRuleListsByAssociationId(associationId: number) {
    return new Promise((resolve, reject) => {
      Association.find({
        where: { id: associationId },
        attributes: ['name'],
        include: [
          {
            model: RuleList,
            as: 'ruleLists',
            attributes: ['title', 'description'],
            include: [
              {
                model: Rule,
                as: 'rules',
                attributes: ['description']
              }
            ]
          }
        ]
      })
      .then(association => {
        resolve(association.ruleLists);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  public static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER({ length: 10 }),
          primaryKey: true,
          unique: true,
          autoIncrement: true,
          field: 'id'
        },
        name: {
          type: DataTypes.STRING(45),
          field: 'name'
        },
        objectionVoteTime: {
          type: DataTypes.INTEGER({ length: 15 }),
          field: 'objection_vote_time'
        }
      },
      { sequelize, tableName: 'associations' }
    );
  }

  public static asscociate(model) {}

  /**
   * @returns {Bluebird<Objection[]>} activeObjections
   */
  public getActiveObjections(): Bluebird<Objection[]> {
    const createdAfter: Date = moment()
      .subtract({ milliseconds: this.objectionVoteTime })
      .toDate();
    return this.getObjections({
      where: { createdAt: { [Op.gt]: createdAfter } },
      attributes: ['id', 'comment', 'createdAt'],
      include: [
        {
          model: User,
          as: 'submittedBy',
          attributes: ['firstName', 'lastName']
        },
        {
          model: User,
          as: 'submittedAgainst',
          attributes: ['firstName', 'lastName']
        }
      ]
    }).then(active => {
      console.log(active);
      return active;
    });
  }
  /**
   * @returns {Bluebird<Objection[]>} activeObjections
   */
  public getUserInbox(userId: number): Bluebird<Objection[]> {
    const createdAfter: Date = moment()
      .subtract({ milliseconds: this.objectionVoteTime })
      .toDate();
    return this.getObjections({
      where: { createdAt: { [Op.gt]: createdAfter } },
      attributes: ['id', 'comment', 'createdAt'],
      include: [
        // {
        //   model: User,
        //   as: 'submittedBy',
        //   attributes: ['firstName', 'lastName'],
        //   where: {
        //     id: { [Op.not]: userId }
        //   },
        //   include: [
        //     {
        //       model: Unit,
        //       attributes: ['addressLineOne'],
        //       as: 'units',
        //     },
        //   ]
        // },
        // {
        //   model: User,
        //   as: 'submittedAgainst',
        //   attributes: ['firstName', 'lastName'],
        //   include: [
        //     {
        //       model: Unit,
        //       attributes: ['addressLineOne'],
        //       as: 'units',
        //     },
        //   ],
        // },
        {
          model: Unit,
          attributes: ['addressLineOne'],
          as: 'submittedBy',
        },
        {
          model: Unit,
          attributes: ['addressLineOne'],
          as: 'submittedAgainst',
        },
      ]
    }).then(active => {
      console.log(active);
      return active;
    });
  }
  /**
   * @returns {Bluebird<Objection[]>} activeObjections
   */
  public getUserOutbox(userId: number): Bluebird<Objection[]> {
    return this.getObjections({
      attributes: ['id', 'comment', 'createdAt'],
      include: [
        // {
        //   model: User,
        //   as: 'submittedBy',
        //   attributes: ['firstName', 'lastName'],
        //   where: {
        //     id: userId
        //   },
        //   include: [
        //     {
        //       model: Unit,
        //       attributes: ['addressLineOne'],
        //       as: 'units',
        //     },
        //   ]
        // },
        // {
        //   model: User,
        //   as: 'submittedAgainst',
        //   attributes: ['firstName', 'lastName'],
        //   include: [
        //     {
        //       model: Unit,
        //       attributes: ['addressLineOne'],
        //       as: 'units',
        //     },
        //   ]
        // }
        {
          model: Unit,
          attributes: ['addressLineOne'],
          as: 'submittedBy',
        },
        {
          model: Unit,
          attributes: ['addressLineOne'],
          as: 'submittedAgainst',
        },
      ]
    }).then(active => {
      console.log(active);
      return active;
    });
  }

  /**
   * @returns {Bluebird<Objection[]>}
   */
  public getExpiredObjections(): Bluebird<Objection[]> {
    const createdBefore: number = moment()
      .subtract({ milliseconds: this.objectionVoteTime })
      .valueOf();
    return this.getObjections({
      where: { createdAt: { [Op.lt]: createdBefore } },
      attributes: ['id', 'comment', 'createdAt'],
      include: [
        {
          model: User,
          as: 'submittedBy',
          attributes: ['firstName', 'lastName']
        },
        {
          model: User,
          as: 'submittedAgainst',
          attributes: ['firstName', 'lastName']
        }
      ]
    }).then(expired => {
      console.log(expired);
      return expired;
    });
  }
}

export const AssociationSchema = Association;
export default AssociationSchema;
