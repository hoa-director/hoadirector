import {
    Model,
    FindOptions,
    DataTypes,
    BelongsTo,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin
} from 'sequelize'
import * as Bluebird from 'bluebird';

export class Objection extends Model {
    id: number;
    associationId: number;
    comment: string;
    // submittedBy: number;
    // submittedAgainst: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    // mixins for association (optional)
    submittedById: number;
    submittedBy: User;
    getSubmittedBy: BelongsToGetAssociationMixin<User>
    setSubmittedBy: BelongsToSetAssociationMixin<User, number>
    createSubmittedBy: BelongsToCreateAssociationMixin<User>
    
    getVotes: HasManyGetAssociationsMixin<Vote>

    public static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER({ length: 10}),
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    field: 'id',
                },
                associationId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'association_id',
                },
                comment: {
                    type: DataTypes.STRING(500),
                    field: 'comment',
                },
                submittedByUserId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'submitted_by_user_id'
                },
                submittedAgainstUserId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'submitted_against_user_id'
                }
            },
            { sequelize, tableName: 'objections' }
        );
        return this;
    };

    public static asscociate(model) {

    }

    public static getOpenByAssociationId(associationId): Bluebird<Objection[]> {
        return Association.findById(associationId).then(association => {
            return Objection.findAll({
                where: {
                    associationId
                }
            }).then(objections => {
                console.log(objections);
                return objections;
            })
        })
    }

    public hasUserVoted(userId) {
        this.getVotes({ where: { userId } }).then(votes => {
            console.log(votes);
        })
    }
};

import { User } from './user';
import { Association } from './association';
import { Vote } from './vote';

export const ObjectionSchema = Objection;
export default ObjectionSchema;
