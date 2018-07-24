import { Router, Request, Response, NextFunction } from 'express';

export class ApiRouter {
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
  public getHome(req: Request, res: Response, next: NextFunction) {
    res.send(200);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send(200);
    });
    console.log('api test');
  }
}

// Create the IndexRouter, and export its configured Express.Router
const apiRoutes = new ApiRouter().router;

export default apiRoutes;
