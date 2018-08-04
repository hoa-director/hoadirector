import * as Sequelize from 'sequelize';
import connection from '../config/database';
import Association from './association';

export class Unit extends Sequelize.Model {
    id: number;
    userId: number;
    associationId: number;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zip: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

Unit.init(
    {
        id: {
            type: Sequelize.INTEGER({ length: 10}),
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field: 'id',
        },
        userId: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'user_id',
        },
        associationId: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'association_id',
        },
        addressLineOne: {
            type: Sequelize.STRING(100),
            field: 'address_line_one',
        },
        addressLineTwo: {
            type: Sequelize.STRING(100),
            field: 'address_line_two',
        },
        city: {
            type: Sequelize.STRING(60),
            field: 'city',
        },
        state: {
            type: Sequelize.STRING(45),
            field: 'state',
        },
        zip: {
            type: Sequelize.INTEGER({ length: 10 }),
            field: 'zip',
        },
    },
    { sequelize: connection }
);

export const UnitSchema = Unit;
export default UnitSchema;
