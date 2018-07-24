import * as path from 'path';
import { Router, Request, Response, NextFunction } from 'express';

export class IndexRouter {
  router: Router;

  /**
   * Initialize the IndexRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Data
   */
  public getIndex(req: Request, res: Response, next: NextFunction) {
    console.log('request for index');
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('*', this.getIndex);
  }

}

// Create the IndexRouter, and export its configured Express.Router
const indexRoutes = new IndexRouter().router;

export default indexRoutes;
