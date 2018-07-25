import { Router, Request, Response, NextFunction } from 'express';

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
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send(200);
    });
  }
}

const apiRoutes = new ApiRouter().router;

export default apiRoutes;
