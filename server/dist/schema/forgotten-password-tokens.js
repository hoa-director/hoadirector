"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid = require("uuid");
class ForgottenPasswordToken extends sequelize_1.Model {
    static initialize(sequelize) {
        ForgottenPasswordToken.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: 'id',
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                field: 'user_id',
            },
            token: {
                type: sequelize_1.DataTypes.STRING(100),
                field: 'token',
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                field: 'updated_at',
            },
            deletedAt: {
                type: sequelize_1.DataTypes.DATE,
                field: 'deleted_at',
            },
        }, { sequelize, tableName: 'forgotten_password_tokens' });
        ForgottenPasswordToken.beforeCreate((forgottenPasswordToken, options) => {
            const token = uuid();
            forgottenPasswordToken.token = token;
        });
    }
    static asscociate(model) { }
}
exports.ForgottenPasswordToken = ForgottenPasswordToken;
exports.ForgottenPasswordTokenSchema = ForgottenPasswordToken;
exports.default = ForgottenPasswordToken;
//# sourceMappingURL=forgotten-password-tokens.js.map