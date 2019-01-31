import { NextFunction, Request, Response, Router } from 'express';
import * as passport from 'passport';
import { UserSchema } from '../schema/user';
import { roles } from '../config/roles';
import { Association } from '../schema/schemas';

const passportRedirect: passport.AuthenticateOptions = {};

export class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    if (req.user.role === roles.ADMIN) {
      console.log('USER IS AN ADMIN');
      return Association.findAll({
        attributes: [
          'id',
          'name'
        ]
      }).then(associations => {
        req.session.associationId = associations[0].id;
        res.send(req.user);
      });
    }
    req.user.getAvailableAssociations().then((associations) => {
      req.session.associationId = associations[0].id;
      res.send(req.user);
    });
  }

  public loggedin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.sendStatus(403);
    }
  }

  public register(req: Request, res: Response, next: NextFunction) {
    const newUser = new UserSchema(req.body);
    newUser
      .save()
      .then((data) => {
        console.log(data);
        res.send(newUser);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }

  private getUserAssociations(req: Request, res: Response, next: NextFunction) {
    req.user.getAvailableAssociations().then((associations) => {
      res.send({associations, currentAssociation: req.session.associationId});
    });
  }

  private setCurrentAssociation(req: Request, res: Response, next: NextFunction) {
    const associationId: number = parseInt(req.body.associationId, 10);
    console.log(associationId);
    req.user.getAvailableAssociations().then((associations) => {
      console.log(associations);
      if (!associations.some(association => association.id === associationId)) {
        return res.sendStatus(403);
      }
      req.session.associationId = associationId
      res.send({associations, currentAssociation: req.session.associationId});
    });
  }

  init() {
    this.router.post(
      '/login/',
      passport.authenticate('local', passportRedirect),
      this.login,
    );
    this.router.post('/register/', this.register);
    this.router.get('/associations', this.getUserAssociations);
    this.router.post('/associations', this.setCurrentAssociation);
    this.router.get('/', this.loggedin);
  }
}

const userRoutes = new UserRouter().router;

export default userRoutes;
