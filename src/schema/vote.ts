import * as Sequelize from 'sequelize';

export class Vote extends Sequelize.Model {
    id: number;
    userId: number;
    objectionId: number;
    annonymous: Boolean;
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
                objectionId: {
                    type: Sequelize.INTEGER({ length: 10 }),
                    field: 'objection_id',
                },
                annonymous: {
                    type: Sequelize.BOOLEAN,
                    field: 'annonymous',
                },
            },
            { sequelize, tableName: 'votes' }
        );
    };
};

export const VoteSchema = Vote;
export default VoteSchema;
