import * as path from 'path';
import { Router, Request, Response, NextFunction } from 'express';

export class IndexRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getIndex(req: Request, res: Response, next: NextFunction) {
    console.log('request for index');
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }

  init() {
    this.router.get('*', this.getIndex);
  }

}

const indexRoutes = new IndexRouter().router;

export default indexRoutes;
