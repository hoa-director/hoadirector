import { Model, DataTypes } from 'sequelize'

export class Vote extends Model {
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
                    type: DataTypes.INTEGER({ length: 10}),
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    field: 'id',
                },
                userId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'user_id',
                },
                objectionId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'objection_id',
                },
                annonymous: {
                    type: DataTypes.BOOLEAN,
                    field: 'annonymous',
                },
                approved: {
                    type: DataTypes.BOOLEAN,
                    field: 'approved',
                },
            },
            { sequelize, tableName: 'votes' }
        );
    };

    public static asscociate(model) {
        
    }
};

export const VoteSchema = Vote;
export default VoteSchema;
