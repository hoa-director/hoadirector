import { Router, Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { Association, Document, Objection, User, Vote } from '../schema/schemas';

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
    this.router.post('/objection', this.fileObjection);
    this.router.post('/vote', this.submitVote);
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
  private fileObjection = (req: Request, res: Response, next: NextFunction) => {
    const against = req.body.against;
    const by = req.user.id;
    const message = req.body.message;
    const associationId = req.session.associationId;
    console.log(message);
    Objection.create({
      associationId,
      comment: message,
      submittedByUserId: by,
      submittedAgainstUserId: against
    }).then((objection) => {
      res.sendStatus(200);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  private submitVote = (req: Request, res: Response, next: NextFunction) => {
    const objectionId: number = parseInt(req.body.objectionId);
    const approved: number = parseInt(req.body.approved);
    const annonymous: number = req.body.annonymous ? parseInt(req.body.annonymous) : 0;
    const userId: number = parseInt(req.user.id);
    Vote.create({
      objectionId,
      approved,
      annonymous,
      userId,
    }).then(vote => {
      console.log(vote);
      res.sendStatus(200);
    }).catch(error => {
      console.error(error);
      res.sendStatus(200);
    });
  }
  private getObjections = (req: Request, res: Response, next: NextFunction) => {
    const associationId: number = parseInt(req.session.associationId);
  }
}

const apiRoutes = new ApiRouter().router;

export default apiRoutes;
