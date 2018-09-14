import {
    Model,
    FindOptions,
    DataTypes,
    BelongsTo,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
} from 'sequelize'

export class Objection extends Model {
    id: number;
    associationId: number;
    comment: string;
    // submittedBy: number;
    // submittedAgainst: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    // mixins for association (optional)
    submittedById: number;
    submittedBy: User;
    getSubmittedBy: BelongsToGetAssociationMixin<User>
    setSubmittedBy: BelongsToSetAssociationMixin<User, number>
    createSubmittedBy: BelongsToCreateAssociationMixin<User>

    public static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER({ length: 10}),
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    field: 'id',
                },
                associationId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'association_id',
                },
                comment: {
                    type: DataTypes.STRING(500),
                    field: 'comment',
                },
                submittedByUserId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'submitted_by_user_id'
                },
                submittedAgainstUserId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'submitted_against_user_id'
                }
            },
            { sequelize, tableName: 'objections' }
        );
        return this;
    };

    public static asscociate(model) {

    }
};

import User from './user';

export const ObjectionSchema = Objection;
export default ObjectionSchema;
