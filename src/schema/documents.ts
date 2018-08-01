import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class Documents extends Sequelize.Model {
    id: number;
    associationId: number;
    path: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

Documents.init(
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
        path: {
            type: Sequelize.STRING(100),
            field: 'path',
        },
        name: {
            type: Sequelize.STRING(45),
            field: 'name',
        },
    },
    { sequelize: connection }
);

export const DocumentsSchema = Documents;
export default DocumentsSchema;
