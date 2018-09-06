import { Router, Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { Association, Document, RuleList } from '../schema/schemas';

export class ApiRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/documents', this.getDocumnets);
    this.router.get('/documents/:id', this.viewDocument);
    this.router.get('/directory', this.getDirectory);
    this.router.get('/rules', this.getRules);
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    });
  }

  private getDocumnets = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Document.getDocumentsByAssociation(associationId).then(documents => {
      res.send(documents);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private getDirectory = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Association.getDirectoryByAssociationId(associationId).then(directory => {
      res.send(directory);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private viewDocument = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId || 1;
    const documentId = req.params.id;
    Document.getDocumentByAssociationAndId(associationId, documentId).then((document: any) => {
      var data =fs.readFileSync(path.join(__dirname, '..', document.dataValues.path));
      res.contentType("application/pdf");
      res.send(data);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
  private getRules = (req: Request, res: Response, next: NextFunction) => {
    const associationId = req.session.associationId;
    Association.getRuleListsByAssociationId(associationId).then(ruleLists => {
      res.send(ruleLists);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  }
}

const apiRoutes = new ApiRouter().router;

export default apiRoutes;
