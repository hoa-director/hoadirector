"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const association_1 = require("./association");
const document_1 = require("./document");
const forgotten_password_tokens_1 = require("./forgotten-password-tokens");
const objection_1 = require("./objection");
const rule_1 = require("./rule");
const rule_list_1 = require("./rule-list");
const unit_1 = require("./unit");
const user_1 = require("./user");
const vote_1 = require("./vote");
association_1.AssociationSchema.initialize(database_1.connection);
document_1.DocumentSchema.initialize(database_1.connection);
forgotten_password_tokens_1.ForgottenPasswordTokenSchema.initialize(database_1.connection);
objection_1.ObjectionSchema.initialize(database_1.connection);
rule_list_1.RuleListSchema.initialize(database_1.connection);
rule_1.RuleSchema.initialize(database_1.connection);
unit_1.UnitSchema.initialize(database_1.connection);
user_1.UserSchema.initialize(database_1.connection);
vote_1.VoteSchema.initialize(database_1.connection);
association_1.AssociationSchema.hasMany(unit_1.UnitSchema, {
    as: 'units',
    foreignKey: 'association_id',
});
association_1.AssociationSchema.hasMany(document_1.DocumentSchema, {
    as: 'documents',
    foreignKey: 'association_id',
});
association_1.AssociationSchema.hasMany(rule_list_1.RuleListSchema, {
    as: 'ruleLists',
    foreignKey: 'association_id',
});
association_1.AssociationSchema.hasMany(objection_1.ObjectionSchema, {
    as: 'objections',
    foreignKey: 'association_id',
});
association_1.AssociationSchema.belongsToMany(user_1.UserSchema, {
    through: unit_1.UnitSchema,
    as: 'users',
});
document_1.DocumentSchema.belongsTo(association_1.AssociationSchema, {
    as: 'association',
    foreignKey: 'association_id',
    targetKey: 'id',
});
forgotten_password_tokens_1.ForgottenPasswordTokenSchema.belongsTo(user_1.UserSchema, {
    as: 'user',
    foreignKey: 'user_id',
    targetKey: 'id',
});
objection_1.ObjectionSchema.belongsTo(user_1.UserSchema, {
    as: 'submittedBy',
    foreignKey: 'submitted_by_user_id',
    targetKey: 'id',
});
objection_1.ObjectionSchema.belongsTo(user_1.UserSchema, {
    as: 'submittedAgainst',
    foreignKey: 'submitted_against_user_id',
    targetKey: 'id',
});
// ObjectionSchema.belongsTo(UnitSchema, {
//     as: 'submittedBy',
//     // through: UserSchema,
//     foreignKey: 'submitted_by_unit_id',
//     targetKey: 'id',
// });
// ObjectionSchema.belongsTo(UnitSchema, {
//     as: 'submittedAgainst',
//     // through: UserSchema,
//     foreignKey: 'submitted_against_unit_id',
//     targetKey: 'id',
// });
objection_1.ObjectionSchema.belongsTo(association_1.AssociationSchema, {
    as: 'association',
    foreignKey: 'association_id',
    targetKey: 'id',
});
objection_1.ObjectionSchema.hasMany(vote_1.VoteSchema, {
    as: 'votes',
    foreignKey: 'objection_id',
});
rule_list_1.RuleListSchema.hasMany(rule_1.RuleSchema, {
    as: 'rules',
    foreignKey: 'rule_list_id',
});
rule_list_1.RuleListSchema.belongsTo(association_1.AssociationSchema, {
    as: 'association',
    foreignKey: 'association_id',
});
rule_1.RuleSchema.belongsTo(rule_list_1.RuleListSchema, {
    as: 'ruleList',
    foreignKey: 'ruleListId',
    targetKey: 'id',
});
unit_1.UnitSchema.belongsTo(user_1.UserSchema, {
    foreignKey: 'user_id',
    as: 'user',
});
unit_1.UnitSchema.belongsTo(association_1.AssociationSchema, {
    foreignKey: 'association_id',
    targetKey: 'id',
});
user_1.UserSchema.hasMany(unit_1.UnitSchema, {
    as: 'units',
    foreignKey: 'user_id',
});
user_1.UserSchema.hasMany(vote_1.VoteSchema, {
    as: 'votes',
    foreignKey: 'user_id',
});
user_1.UserSchema.hasMany(objection_1.ObjectionSchema, {
    as: 'objetionsSubmitted',
    foreignKey: 'submitted_by_user_id',
});
user_1.UserSchema.hasMany(objection_1.ObjectionSchema, {
    as: 'objectionsAgainst',
    foreignKey: 'submitted_against_user_id',
});
user_1.UserSchema.belongsToMany(association_1.AssociationSchema, {
    through: unit_1.UnitSchema,
    as: 'associations',
});
user_1.UserSchema.hasMany(forgotten_password_tokens_1.ForgottenPasswordTokenSchema, {
    as: 'tokens',
    foreignKey: 'user_id',
});
vote_1.VoteSchema.belongsTo(user_1.UserSchema, {
    as: 'user',
    foreignKey: 'user_id',
});
vote_1.VoteSchema.belongsTo(objection_1.ObjectionSchema, {
    as: 'objection',
    foreignKey: 'objection_id',
});
exports.Association = association_1.AssociationSchema;
exports.Document = document_1.DocumentSchema;
exports.ForgottenPasswordToken = forgotten_password_tokens_1.ForgottenPasswordTokenSchema;
exports.Objection = objection_1.ObjectionSchema;
exports.RuleList = rule_list_1.RuleListSchema;
exports.Rule = rule_1.RuleSchema;
exports.Unit = unit_1.UnitSchema;
exports.User = user_1.UserSchema;
exports.Vote = vote_1.VoteSchema;
//# sourceMappingURL=schemas.js.map