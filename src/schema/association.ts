import * as Sequelize from 'sequelize';
import connection from '../config/database';

import { Unit } from './unit';
import { Document } from './document';
import { RuleList } from './rule-list';
import { Objection } from './objection';

export class Association extends Sequelize.Model {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

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
            { sequelize }
        );
    };
};

export const AssociationSchema = Association;
export default AssociationSchema;
