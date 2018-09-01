import { connection } from '../config/database';
import { AssociationSchema } from './association';
import { DocumentSchema } from './document';
import { ObjectionSchema } from './objection';
import { RuleListSchema } from './rule-list';
import { RuleSchema } from './rule';
import { UnitSchema } from './unit';
import { UserSchema } from './user';
import { VoteSchema } from './vote';

AssociationSchema.init(connection);
DocumentSchema.init(connection);
ObjectionSchema.init(connection);
RuleListSchema.init(connection);
RuleSchema.init(connection);
UnitSchema.init(connection);
UserSchema.init(connection);
VoteSchema.init(connection);


AssociationSchema.hasMany(UnitSchema, {
    as: 'units',
    foreignKey: 'association_id',
});

AssociationSchema.hasMany(DocumentSchema, {
    as: 'documents',
    foreignKey: 'association_id',
});

AssociationSchema.hasMany(RuleListSchema, {
    as: 'ruleLists',
    foreignKey: 'association_id',
});

AssociationSchema.hasMany(ObjectionSchema, {
    as: 'objections',
    foreignKey: 'association_id',
});

DocumentSchema.belongsTo(AssociationSchema, {
    as: 'association',
    foreignKey: 'association_id',
    targetKey: 'id',
});

ObjectionSchema.belongsTo(UserSchema, {
    as: 'submittedBy',
    foreignKey: 'submitted_by',
    targetKey: 'id',
});

ObjectionSchema.belongsTo(UserSchema, {
    as: 'submittedAgainst',
    foreignKey: 'submitted_against',
    targetKey: 'id',
});

ObjectionSchema.belongsTo(AssociationSchema, {
    as: 'association',
    foreignKey: 'association_id',
    targetKey: 'id',
});

ObjectionSchema.hasMany(VoteSchema, {
    as: 'votes',
    foreignKey: 'objection_id',
});

RuleListSchema.hasMany(RuleSchema, {
    as: 'rules',
    foreignKey: 'rule_list_id',
});

RuleListSchema.belongsTo(AssociationSchema, {
    as: 'association',
    foreignKey: 'association_id',
});

RuleSchema.belongsTo(RuleListSchema, {
    as: 'ruleList',
    foreignKey: 'ruleListId',
    targetKey: 'id',
});

UnitSchema.belongsTo(UserSchema, {
    foreignKey: 'user_id',
    as: 'user',
});

UnitSchema.belongsTo(AssociationSchema, {
    foreignKey: 'association_id',
    targetKey: 'id',
});

UserSchema.hasMany(UnitSchema, {
    as: 'units',
    foreignKey: 'user_id',
});

UserSchema.hasMany(VoteSchema, {
    as: 'votes',
    foreignKey: 'user_id',
});

UserSchema.hasMany(ObjectionSchema, {
    as: 'objetionsSubmitted',
    foreignKey: 'submitted_by',
});

UserSchema.hasMany(ObjectionSchema, {
    as: 'objectionsAgainst',
    foreignKey: 'submitted_against',
});

UserSchema.belongsToMany(AssociationSchema, {
    through: UnitSchema,
    as: 'associations',
});

VoteSchema.belongsTo(UserSchema, {
    as: 'user',
    foreignKey: 'user_id',
});

VoteSchema.belongsTo(ObjectionSchema, {
    as: 'objection',
    foreignKey: 'objection_id',
});

// connection.sync();

export const Association = AssociationSchema;
export const Document = DocumentSchema;
export const Objection = ObjectionSchema;
export const RuleList = RuleListSchema;
export const Rule = RuleSchema;
export const Unit = UnitSchema;
export const User = UserSchema;
export const Vote = VoteSchema;