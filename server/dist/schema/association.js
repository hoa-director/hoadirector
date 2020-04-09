"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const sequelize_1 = require("sequelize");
const rule_1 = require("./rule");
const rule_list_1 = require("./rule-list");
const unit_1 = require("./unit");
const user_1 = require("./user");
class Association extends sequelize_1.Model {
    static getDirectoryByAssociationId(associationId) {
        return new Promise((resolve, reject) => {
            Association.findOne({
                where: { id: associationId },
                attributes: ['name'],
                include: [
                    {
                        model: unit_1.Unit,
                        as: 'units',
                        attributes: [
                            'addressLineOne',
                            'addressLineTwo',
                            'city',
                            'state',
                            'zip',
                        ],
                        include: [
                            {
                                model: user_1.User,
                                as: 'user',
                                attributes: ['firstName', 'lastName', 'email', 'number'],
                            },
                        ],
                    },
                ],
            })
                .then((association) => {
                resolve(association);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static findAllWithUserEmails() {
        return Association.findAll({
            include: [
                {
                    model: unit_1.Unit,
                    as: 'units',
                    include: [
                        {
                            model: user_1.User,
                            as: 'user',
                            attributes: ['email'],
                        },
                    ],
                },
            ],
        }).then((associations) => {
            associations.map((association) => {
                const users = association.units.map((unit) => {
                    return unit.user;
                });
                association.users = users;
            });
            return associations;
        });
    }
    static getUsersByAssociationId(associationId) {
        return Association.findOne({
            where: { id: associationId },
            include: [
                {
                    model: unit_1.Unit,
                    as: 'units',
                    include: [
                        {
                            model: user_1.User,
                            as: 'user',
                            attributes: ['email'],
                        },
                    ],
                },
            ],
        }).then((association) => {
            const users = association.units.map((unit) => {
                return unit.user;
            });
            return users;
        });
    }
    static getRuleListsByAssociationId(associationId) {
        return new Promise((resolve, reject) => {
            Association.findOne({
                where: { id: associationId },
                attributes: ['name'],
                include: [
                    {
                        model: rule_list_1.RuleList,
                        as: 'ruleLists',
                        attributes: ['title', 'description'],
                        include: [
                            {
                                model: rule_1.Rule,
                                as: 'rules',
                                attributes: ['description'],
                            },
                        ],
                    },
                ],
            })
                .then((association) => {
                resolve(association.ruleLists);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static initialize(sequelize) {
        Association.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER({ length: 10 }),
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: 'id',
            },
            name: {
                type: sequelize_1.DataTypes.STRING(45),
                field: 'name',
            },
            objectionVoteTime: {
                type: sequelize_1.DataTypes.INTEGER({ length: 15 }),
                field: 'objection_vote_time',
            },
        }, { sequelize, tableName: 'associations' });
    }
    static asscociate(model) { }
    /**
     * @returns {Bluebird<Objection[]>} activeObjections
     */
    getActiveObjections() {
        const createdAfter = moment()
            .subtract({ milliseconds: this.objectionVoteTime })
            .toDate();
        return this.getObjections({
            where: { createdAt: { [sequelize_1.Op.gt]: createdAfter } },
            attributes: ['id', 'comment', 'createdAt'],
            include: [
                {
                    model: user_1.User,
                    as: 'submittedBy',
                    attributes: ['firstName', 'lastName'],
                },
                {
                    model: user_1.User,
                    as: 'submittedAgainst',
                    attributes: ['firstName', 'lastName'],
                },
            ],
        }).then((active) => {
            console.log(active);
            return active;
        });
    }
    /**
     * @returns {Bluebird<Objection[]>} activeObjections
     */
    getUserInbox(userId) {
        const createdAfter = moment()
            .subtract({ milliseconds: this.objectionVoteTime })
            .toDate();
        return this.getObjections({
            where: {
                createdAt: { [sequelize_1.Op.gt]: createdAfter },
                submittedByUserId: { [sequelize_1.Op.ne]: userId },
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'comment', 'createdAt'],
            include: [
                {
                    model: user_1.User,
                    as: 'submittedBy',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId: this.id },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
                {
                    model: user_1.User,
                    as: 'submittedAgainst',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId: this.id },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
            ],
        });
    }
    /**
     * @returns {Bluebird<Objection[]>} activeObjections
     */
    getUserOutbox(userId) {
        return this.getObjections({
            where: {
                submittedByUserId: userId,
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'comment', 'createdAt'],
            include: [
                {
                    model: user_1.User,
                    as: 'submittedBy',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId: this.id },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
                {
                    model: user_1.User,
                    as: 'submittedAgainst',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId: this.id },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
            ],
        });
    }
    /**
     * @returns {Bluebird<Objection[]>}
     */
    getPastObjections() {
        return this.getObjections({
            where: {
                /* tslint:disable-next-line:no-null-keyword */
                closedAt: { [sequelize_1.Op.ne]: null },
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'comment', 'createdAt'],
            include: [
                {
                    model: user_1.User,
                    as: 'submittedBy',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId: this.id },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
                {
                    model: user_1.User,
                    as: 'submittedAgainst',
                    attributes: ['id'],
                    include: [
                        {
                            model: unit_1.Unit,
                            as: 'units',
                            where: { associationId: this.id },
                            attributes: ['addressLineOne'],
                        },
                    ],
                },
            ],
        });
    }
    /**
     * @returns {Bluebird<Objection[]>}
     */
    getExpiredObjections() {
        const createdBefore = moment()
            .subtract({ milliseconds: this.objectionVoteTime })
            .valueOf();
        return this.getObjections({
            where: {
                createdAt: { [sequelize_1.Op.lt]: createdBefore },
                /* tslint:disable-next-line:no-null-keyword */
                closedAt: null,
            },
            attributes: ['id', 'comment', 'createdAt'],
            include: [
                {
                    model: user_1.User,
                    attributes: ['firstName', 'lastName'],
                    as: 'submittedBy',
                },
                {
                    model: user_1.User,
                    attributes: ['firstName', 'lastName'],
                    as: 'submittedAgainst',
                },
            ],
        });
    }
    getUsers() {
        return Association.findOne({
            where: { id: this.id },
            include: [
                {
                    model: unit_1.Unit,
                    as: 'units',
                    include: [
                        {
                            model: user_1.User,
                            as: 'user',
                            attributes: ['email'],
                        },
                    ],
                },
            ],
        }).then((association) => {
            const users = association.units.map((unit) => {
                return unit.user;
            });
            return users;
        });
    }
}
exports.Association = Association;
exports.AssociationSchema = Association;
exports.default = exports.AssociationSchema;
//# sourceMappingURL=association.js.map