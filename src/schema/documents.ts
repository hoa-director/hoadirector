import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class Documents extends Sequelize.Model {

    id: number;
    associationId: string;
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
        name: {
            type: Sequelize.STRING(45),
            field: 'name',
        },
        path: {
            type: Sequelize.STRING(100),
            field: 'path',
        },
        association_id: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'association_id',
        },
    },
    { sequelize: connection }
);

export const DocumentsSchema = Documents;
export default DocumentsSchema;
