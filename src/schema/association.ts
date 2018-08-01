import * as Sequelize from 'sequelize';
import connection from '../config/database';

export class Association extends Sequelize.Model {

    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

Association.init(
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
    },
    { sequelize: connection }
);

export const AssociationSchema = Association;
export default AssociationSchema;
