import { Model, DataTypes } from 'sequelize'
import { DuplicateError } from '../classes/duplicate-error';

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
        Vote.beforeValidate(async (vote, options) => {
            return await Objection.find({ where: { id: vote.objectionId }, include: [ { model: Association, as: 'association' } ] }).then(async objection => {
                await objection.getVotes().then(async votes => {
                    // User has already voted. Cancel creation
                    if (votes.length) {
                        return Promise.reject(new DuplicateError('Duplicate entry'))
                    };
                })
            })
        });
    };

    public static asscociate(model) {
        
    }
};

import { Objection } from './objection';
import { Association } from './association';
import { async } from '@angular/core/testing';


export const VoteSchema = Vote;
export default VoteSchema;
