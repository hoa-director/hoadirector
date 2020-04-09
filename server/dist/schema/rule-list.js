"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class RuleList extends Sequelize.Model {
    static initialize(sequelize) {
        RuleList.init({
            id: {
                type: Sequelize.INTEGER({ length: 10 }),
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
        }, { sequelize, tableName: 'rule_lists' });
    }
    static asscociate(model) { }
}
exports.RuleList = RuleList;
exports.RuleListSchema = RuleList;
exports.default = exports.RuleListSchema;
//# sourceMappingURL=rule-list.js.map