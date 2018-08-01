import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class Rules extends Sequelize.Model {

    id: number;
    ruleListId: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

Rules.init(
    {
        id: {
            type: Sequelize.INTEGER({ length: 10}),
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field: 'id',
        },
        ruleListId: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'association_id',
        },
        description: {
            type: Sequelize.STRING(500),
            field: 'description',
        },
    },
    { sequelize: connection }
);

export const RulesSchema = Rules;
export default RulesSchema;
