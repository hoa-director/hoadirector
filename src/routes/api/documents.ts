import { NextFunction, Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { Document } from '../../schema/schemas';

export class DocumentsRouter {
  public routePrefix = 'directory';

  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', this.getDocumnets);
    this.router.get('/:id', this.viewDocument);
  }

  private getDocumnets = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Document.getDocumentsByAssociation(associationId)
      .then((documents) => {
        res.send(documents);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  }

  private viewDocument = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId || 1;
    const documentId = req.params.id;
    Document.getDocumentByAssociationAndId(associationId, documentId)
      .then((document: any) => {
        const data = fs.readFileSync(
          path.join(__dirname, '..', document.dataValues.path),
        );
        res.contentType('application/pdf');
        res.header('Content-Disposition', 'inline; name=' + document.name);
        res.send(data);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  }
}

const documentsRoutes = new DocumentsRouter().router;

export default documentsRoutes;
