import { Router, Request, Response, NextFunction } from 'express';

export class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    res.send(200);
  }

  init() {
    this.router.post('/login', this.login);
  }
}

const userRoutes = new UserRouter().router;

export default userRoutes;
