"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class Rule extends Sequelize.Model {
    static initialize(sequelize) {
        Rule.init({
            id: {
                type: Sequelize.INTEGER({ length: 10 }),
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
        }, { sequelize, tableName: 'rules' });
    }
    static asscociate(model) { }
}
exports.Rule = Rule;
exports.RuleSchema = Rule;
exports.default = exports.RuleSchema;
//# sourceMappingURL=rule.js.map