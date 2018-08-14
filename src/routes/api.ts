import { Router, Request, Response, NextFunction } from 'express';

import { Document } from '../schema/schemas';

export class ApiRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getHome(req: Request, res: Response, next: NextFunction) {
    res.send(200);
  }

  init() {
    this.router.get('/documents', (req: Request, res: Response, next: NextFunction) => {
      const associationId = req.session.associationId;
      Document.getDocumentsByAssociation(associationId).then(documents => {
        res.send(documents);
      }).catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
    });
    this.router.get('associations', (req: Request, res: Response, next: NextFunction) => {
      
    })
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    });
  }
}

const apiRoutes = new ApiRouter().router;

export default apiRoutes;
