import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class RuleLists extends Sequelize.Model {

    id: number;
    associationId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

RuleLists.init(
    {
        id: {
            type: Sequelize.INTEGER({ length: 10}),
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field: 'id',
        },
        association_id: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'association_id',
        },
        title: {
            type: Sequelize.STRING(100),
            field: 'comment',
        },
        description: {
            type: Sequelize.STRING(100),
            field: 'submitted_by',
        },
    },
    { sequelize: connection }
);

export const RuleListsSchema = RuleLists;
export default RuleListsSchema;
