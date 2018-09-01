import * as Sequelize from 'sequelize';

import { Unit } from './unit';
import { User } from './user';
import { RuleList } from './rule-list';
import { Rule } from './rule';

export class Association extends Sequelize.Model {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    ruleLists: RuleList[];

    public static getDirectoryByAssociationId(associationId: number) {
        return new Promise((resolve, reject) => {
            Association.find({
                where: {id: associationId},
                attributes: ['name'],
                include: [
                    {
                        model: Unit, 
                        as: 'units',
                        attributes: ['addressLineOne', 'addressLineTwo', 'city', 'state', 'zip'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['fullName', 'email', 'number']
                            }
                        ]
                    }
                ]
            }).then(association => {
                resolve(association);
            }).catch(error => {
                reject(error);
            });
        })
    }

    public static getRuleListsByAssociationId(associationId: number) {
        return new Promise((resolve, reject) => {
            Association.find({
                where: {id: associationId},
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
            }).then(association => {
                resolve(association.ruleLists);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER({ length: 10}),
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    field: 'id',
                },
                name: {
                    type: Sequelize.STRING(45),
                    field: 'name',
                },
            },
            { sequelize, tableName: 'associations' }
        );
    };
};

export const AssociationSchema = Association;
export default AssociationSchema;
