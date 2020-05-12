"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const sequelize_1 = require("sequelize");
const association_1 = require("./association");
class Objection extends sequelize_1.Model {
    static initialize(sequelize) {
        Objection.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: 'id',
            },
            associationId: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                field: 'association_id',
            },
            comment: {
                type: sequelize_1.DataTypes.STRING(500),
                field: 'comment',
            },
            submittedByUserId: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                field: 'submitted_by_user_id',
            },
            submittedAgainstUserId: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                field: 'submitted_against_user_id',
            },
            closedAt: {
                type: sequelize_1.DataTypes.DATE,
                field: 'closed_at',
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
        }, { sequelize, tableName: 'objections' });
    }
    static asscociate(model) { }
    static getOpenByAssociationId(associationId) {
        return association_1.Association.findByPk(associationId).then((association) => {
            return Objection.findAll({
                where: {
                    associationId,
                },
            }).then((objections) => {
                console.log(objections);
                return objections;
            });
        });
    }
    hasUserVoted(userId) {
        this.getVotes({ where: { userId } }).then((votes) => {
            console.log(votes);
        });
    }
    getResults() {
        return this.getVotes().then((votes) => {
            let votesFor = 0;
            let votesAgainst = 0;
            votes.map((vote) => {
                if (vote.approved) {
                    votesFor += 1;
                }
                else {
                    votesAgainst += 1;
                }
            });
            return {
                passed: votesFor > votesAgainst,
                votesFor,
                votesAgainst,
            };
        });
    }
    userCanVote(user) {
        console.log(this);
        // If the objection is closed then it can no longer be voted on
        if (this.closedAt) {
            return Bluebird.resolve(false);
        }
        return this.getVotes({
            where: {
                userId: user.id,
            },
        })
            .then((votes) => {
            return !!votes.length;
        })
            .then((hasVoted) => {
            if (hasVoted) {
                return false;
            }
            return user.isInAssociation(this.associationId);
        });
    }
}
exports.Objection = Objection;
exports.ObjectionSchema = Objection;
exports.default = exports.ObjectionSchema;
//# sourceMappingURL=objection.js.map