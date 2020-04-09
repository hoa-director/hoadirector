"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const sequelize_1 = require("sequelize");
const roles_1 = require("../config/roles");
const association_1 = require("./association");
const saltWorkFactor = 10;
class User extends sequelize_1.Model {
    static encryptPassword(password) {
        const salt = bcrypt.genSaltSync(saltWorkFactor);
        return bcrypt.hashSync(password, salt);
    }
    static findByEmail(email) {
        return User.findOne({ where: { email } });
    }
    static initialize(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: "id"
            },
            email: {
                type: sequelize_1.DataTypes.STRING(100),
                validate: {
                    max: 100,
                    isEmail: true
                },
                unique: true,
                field: "email"
            },
            password: {
                type: sequelize_1.DataTypes.STRING(45),
                validate: {
                    max: 45
                },
                field: "password"
            },
            number: {
                type: sequelize_1.DataTypes.STRING(12),
                field: "number"
            },
            role: {
                type: sequelize_1.DataTypes.INTEGER({ length: 2 }),
                field: "role"
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING(45),
                field: "first_name"
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING(45),
                field: "last_name"
            },
            // fullName: {
            //     type: DataTypes.STRING(91),
            //     field: 'full_name',
            // },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                field: "created_at"
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                field: "updated_at"
            },
            deletedAt: {
                type: sequelize_1.DataTypes.DATE,
                field: "deleted_at"
            }
        }, { sequelize, tableName: "users" });
        User.beforeCreate((user, options) => {
            console.log(user);
            const encryptedPassword = User.encryptPassword(user.password);
            user.password = encryptedPassword;
        });
    }
    static asscociate(model) { }
    getAvailableAssociations() {
        const includedAttributes = ["id", "name"];
        if (this.role === roles_1.roles.ADMIN) {
            return association_1.Association.findAll({
                attributes: includedAttributes
            });
        }
        return this.getAssociations({
            attributes: includedAttributes
        });
    }
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
    changePassword(password) {
        this.password = User.encryptPassword(password);
        return this.save();
    }
    isInAssociation(associationId) {
        return this.getAssociations({
            where: {
                id: associationId
            }
        }).then(associations => {
            return !!associations.length;
        });
    }
}
exports.User = User;
exports.UserSchema = User;
exports.default = User;
//# sourceMappingURL=user.js.map