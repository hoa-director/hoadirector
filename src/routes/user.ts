import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { userSchema } from '../schema/user';

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
      let newUser = new userSchema(req.body);
      newUser.save().then(data => {
        console.log(data);
        res.send(newUser);
      }).catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  }

  init() {
    this.router.post('/login', passport.authenticate('local', passportRedirect), this.login);
    this.router.post('/register/', this.register);
  }
}

const userRoutes = new UserRouter().router;

export default userRoutes;
