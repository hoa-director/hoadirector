import {
    Model,
    DataTypes,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    HasManyGetAssociationsMixin
} from 'sequelize';
import * as Bluebird from 'bluebird';
import { Unit } from './unit';
import { Association } from './association';
import { Vote } from './vote';


export class Objection extends Model {
    id: number;
    associationId: number;
    comment: string;
    // submittedBy: number;
    // submittedAgainst: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    // mixins for association (optional)
    submittedById: number;
    submittedBy: Unit;
    getSubmittedBy: BelongsToGetAssociationMixin<Unit>;
    setSubmittedBy: BelongsToSetAssociationMixin<Unit, number>;
    createSubmittedBy: BelongsToCreateAssociationMixin<Unit>;

    getVotes: HasManyGetAssociationsMixin<Vote>;

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
                associationId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'association_id',
                },
                comment: {
                    type: DataTypes.STRING(500),
                    field: 'comment',
                },
                submittedByUnitId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'submitted_by_unit_id'
                },
                submittedAgainstUnitId: {
                    type: DataTypes.INTEGER({ length: 10 }),
                    field: 'submitted_against_unit_id',
                },
                createdAt: {
                    type: DataTypes.DATE,
                    field: 'created_at',
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    field: 'updated_at'
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    field: 'deleted_at',
                },
            },
            { sequelize, tableName: 'objections' }
        );
        return this;
    };

    public static asscociate(model) {

    };

    public static getOpenByAssociationId(associationId): Bluebird<Objection[]> {
        return Association.findById(associationId).then(association => {
            return Objection.findAll({
                where: {
                    associationId
                }
            }).then(objections => {
                console.log(objections);
                return objections;
            });
        });
    };

    public hasUserVoted(userId) {
        this.getVotes({ where: { userId } }).then(votes => {
            console.log(votes);
        });
    };
};

export const ObjectionSchema = Objection;
export default ObjectionSchema;
