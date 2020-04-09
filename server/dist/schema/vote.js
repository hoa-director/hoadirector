"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const duplicate_error_1 = require("../classes/duplicate-error");
class Vote extends sequelize_1.Model {
    static initialize(sequelize) {
        Vote.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: "id"
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                field: "user_id"
            },
            objectionId: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                field: "objection_id"
            },
            annonymous: {
                type: sequelize_1.DataTypes.BOOLEAN,
                field: "annonymous"
            },
            approved: {
                type: sequelize_1.DataTypes.BOOLEAN,
                field: "approved"
            }
        }, { sequelize, tableName: "votes" });
        Vote.beforeValidate((vote, options) => __awaiter(this, void 0, void 0, function* () {
            return yield objection_1.Objection.findOne({
                where: { id: vote.objectionId },
                include: [{ model: association_1.Association, as: "association" }]
            }).then((objection) => __awaiter(this, void 0, void 0, function* () {
                yield objection.getVotes().then((votes) => __awaiter(this, void 0, void 0, function* () {
                    // User has already voted. Cancel creation
                    if (votes.length) {
                        return Promise.reject(new duplicate_error_1.DuplicateError("Duplicate entry"));
                    }
                }));
            }));
        }));
    }
    static asscociate(model) { }
}
exports.Vote = Vote;
const association_1 = require("./association");
const objection_1 = require("./objection");
exports.VoteSchema = Vote;
exports.default = exports.VoteSchema;
//# sourceMappingURL=vote.js.map