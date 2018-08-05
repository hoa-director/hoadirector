import * as Sequelize from 'sequelize';

import { User } from './user';
import { Vote } from './vote';
import { Association } from './association';

export class Objection extends Sequelize.Model {
    id: number;
    associationId: number;
    comment: string;
    submittedBy: number;
    submittedAgainst: number;
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
                associationId: {
                    type: Sequelize.INTEGER({ length: 10 }),
                    field: 'association_id',
                },
                comment: {
                    type: Sequelize.STRING(500),
                    field: 'comment',
                },
            },
            { sequelize }
        );
    };
};

export const ObjectionSchema = Objection;
export default ObjectionSchema;
