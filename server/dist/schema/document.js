"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class Document extends Sequelize.Model {
    static getDocumentsByAssociation(associationId) {
        return new Promise((resolve, reject) => {
            Document.findAll({ where: { associationId } })
                .then((document) => {
                resolve(document);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static getDocumentByAssociationAndId(associationId, documentId) {
        return new Promise((resolve, reject) => {
            Document.findOne({ where: { associationId, id: documentId } })
                .then((document) => {
                resolve(document);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static initialize(sequelize) {
        Document.init({
            id: {
                type: Sequelize.INTEGER({ length: 10 }),
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
        }, { sequelize, tableName: 'documents' });
    }
    static asscociate(model) { }
}
exports.Document = Document;
exports.DocumentSchema = Document;
exports.default = exports.DocumentSchema;
//# sourceMappingURL=document.js.map