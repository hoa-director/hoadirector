import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class Objections extends Sequelize.Model {
    id: number;
    associationId: number;
    comment: string;
    submittedBy: number;
    submittedAgainst: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

Objections.init(
    {
        id: {
            type: Sequelize.INTEGER({ length: 10}),
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field: 'id',
        },
        associationId: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'association_id',
        },
        comment: {
            type: Sequelize.STRING(500),
            field: 'comment',
        },
        submittedBy: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'submitted_by',
        },
        submittedAgainst: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'submitted_against',
        },
    },
    { sequelize: connection }
);

export const ObjectionsSchema = Objections;
export default ObjectionsSchema;
