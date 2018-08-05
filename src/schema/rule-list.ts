import * as Sequelize from 'sequelize';
import connection from '../config/database';

import { Rule } from './rule';
import { Association } from './association';

export class RuleList extends Sequelize.Model {
    id: number;
    associationId: number;
    title: string;
    description: string;
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
                associationId: {
                    type: Sequelize.INTEGER({ length: 10 }),
                    field: 'association_id',
                },
                title: {
                    type: Sequelize.STRING(100),
                    field: 'title',
                },
                description: {
                    type: Sequelize.STRING(100),
                    field: 'description',
                },
            },
            { sequelize }
        );
    };
};

export const RuleListSchema = RuleList;
export default RuleListSchema;
