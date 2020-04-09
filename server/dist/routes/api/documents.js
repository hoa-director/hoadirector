"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const schemas_1 = require("../../schema/schemas");
const bugsnag_1 = require("../../config/bugsnag");
class DocumentsRouter {
    constructor() {
        this.routePrefix = '/documents/';
        this.getDocumnets = (req, res, next) => {
            const associationId = req.session.associationId;
            schemas_1.Document.getDocumentsByAssociation(associationId)
                .then((documents) => {
                res.send(documents);
            })
                .catch((error) => {
                console.log(error);
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        };
        this.viewDocument = (req, res, next) => {
            const associationId = req.session.associationId || 1;
            const documentId = req.params.id;
            schemas_1.Document.getDocumentByAssociationAndId(associationId, documentId)
                .then((document) => {
                const data = fs.readFileSync(path.join(__dirname, '..', '..', document.path));
                res.contentType('application/pdf');
                res.header('Content-Disposition', 'inline; name=' + document.name);
                res.send(data);
            })
                .catch((error) => {
                console.log(error);
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        };
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.getDocumnets);
        this.router.get('/:id', this.viewDocument);
    }
}
exports.DocumentsRouter = DocumentsRouter;
const documentsRoutes = new DocumentsRouter().router;
exports.default = documentsRoutes;
//# sourceMappingURL=documents.js.map