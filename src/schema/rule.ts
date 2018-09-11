import * as Sequelize from 'sequelize';

export class Rule extends Sequelize.Model {
    id: number;
    ruleListId: number;
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
                ruleListId: {
                    type: Sequelize.INTEGER({ length: 10 }),
                    field: 'rule_list_id',
                },
                description: {
                    type: Sequelize.STRING(500),
                    field: 'description',
                },
            },
            { sequelize, tableName: 'rules' }
        );
    };

    public static asscociate(model) {
        
    }
};

export const RuleSchema = Rule;
export default RuleSchema;
