import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { UserSchema } from '../schema/user';

const passportRedirect: passport.AuthenticateOptions = {

};

export class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    req.user.getAssociations().then(associations => {
      req.session.associationId = associations[0].dataValues.id;
      res.send(req.user);
    })
  }

  public loggedin(req: Request, res: Response, next: NextFunction) {
    if(req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.sendStatus(403);
    }
  }

  public register(req: Request, res: Response, next: NextFunction) {
      let newUser = new UserSchema(req.body);
      newUser.save().then(data => {
        console.log(data);
        res.send(newUser);
      }).catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  }

  init() {
    this.router.post('/login/', passport.authenticate('local', passportRedirect), this.login);
    this.router.post('/register/', this.register);
    this.router.get('/', this.loggedin);
  }
}

const userRoutes = new UserRouter().router;

export default userRoutes;
