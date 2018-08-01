import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class Objections extends Sequelize.Model {

    id: number;
    associationId: string;
    comment: string;
    submittedBy: string;
    submittedAgainst: string;
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
        association_id: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'association_id',
        },
    },
    { sequelize: connection }
);

export const ObjectionsSchema = Objections;
export default ObjectionsSchema;
