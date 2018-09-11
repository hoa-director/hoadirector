import * as Sequelize from 'sequelize';

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

    public static init(sequelize) {
        super.init(
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
            { sequelize, tableName: 'units' }
        );
    };

    public static asscociate(model) {
        
    }
};

export const UnitSchema = Unit;
export default UnitSchema;
