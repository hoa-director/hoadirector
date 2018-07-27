import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import User from '../schema/user';

const passportRedirect: passport.AuthenticateOptions = {

};

export class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    res.send(req.user);
  }

  public register(req: Request, res: Response, next: NextFunction) {
      let newUser = new User(req.body);
      newUser.save();
      res.send(newUser);
  }

  init() {
    this.router.post('/login', passport.authenticate('local', passportRedirect), this.login);
    this.router.post('/register/', this.register);
  }
}

const userRoutes = new UserRouter().router;

export default userRoutes;
