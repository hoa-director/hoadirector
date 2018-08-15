import * as Sequelize from 'sequelize';

import { Unit } from './unit';
import { User } from './user';

export class Association extends Sequelize.Model {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

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
