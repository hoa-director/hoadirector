"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class Unit extends Sequelize.Model {
    static initialize(sequelize) {
        Unit.init({
            id: {
                type: Sequelize.INTEGER({ length: 10 }),
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: 'id',
            },
            userId: {
                type: Sequelize.INTEGER({ length: 10 }),
                field: 'user_id',
            },
            associationId: {
                type: Sequelize.INTEGER({ length: 10 }),
                field: 'association_id',
            },
            addressLineOne: {
                type: Sequelize.STRING(100),
                field: 'address_line_one',
            },
            addressLineTwo: {
                type: Sequelize.STRING(100),
                field: 'address_line_two',
            },
            city: {
                type: Sequelize.STRING(60),
                field: 'city',
            },
            state: {
                type: Sequelize.STRING(45),
                field: 'state',
            },
            zip: {
                type: Sequelize.INTEGER({ length: 10 }),
                field: 'zip',
            },
        }, { sequelize, tableName: 'units' });
    }
    static asscociate(model) { }
    static getUsersUnit(userId, associationId) {
        return this.findOne({
            where: {
                userId,
                associationId,
            },
        });
    }
}
exports.Unit = Unit;
exports.UnitSchema = Unit;
exports.default = exports.UnitSchema;
//# sourceMappingURL=unit.js.map