import { NextFunction, Request, Response, Router } from 'express';
import * as passport from 'passport';

import { EmailerFactory } from '../factories/emailer-factory';
import User, { UserSchema } from '../schema/user';
import { roles } from '../config/roles';
import { Association, ForgottenPasswordToken } from '../schema/schemas';

const passportRedirect: passport.AuthenticateOptions = {};

export class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    if (req.user.role === roles.ADMIN) {
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

  private logout(req: Request, res: Response, next: NextFunction) {
    req.logOut();
    res.send({});
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
        res.send(newUser);
      })
      .catch((error) => {
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
    req.user.getAvailableAssociations().then((associations) => {
      if (!associations.some(association => association.id === associationId)) {
        return res.sendStatus(403);
      }
      req.session.associationId = associationId
      res.send({associations, currentAssociation: req.session.associationId});
    });
  }

  private isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.sendStatus(403);
  }

  private forgotten(req: Request, res: Response, next: NextFunction) {
    const email = req.query.email;
    User.find({
      where: {email}
    }).then(user => {
      // console.log(user);
      const token = new ForgottenPasswordToken({userId: user.id});
      console.log(token);
      return token.save();
    }).then(token => {
      const emailer = EmailerFactory.createEmailer();
      const emailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset Password',
        text: `
        A new password has been requested for ${email}.
        To reset your password use the following link: hoadirector.com/forgotten-password/${token.token}
        `,
        html: `
        <p>A new password has been requested for ${email}.</p>
        <p>To reset your password <a href="hoadirector.com/forgotten-password/${token.token}">here</a></p>
        <p>or use the following link: hoadirector.com/forgotten-password/${token.token}</p>
        `,
      }
      return emailer.sendMail(emailOptions);
    }).then(email => {
      res.sendStatus(200);
    }).catch(error => {
      console.error(error);
      res.sendStatus(500);
    })
  }

  init() {
    this.router.post(
      '/login/',
      passport.authenticate('local', passportRedirect),
      this.login,
    );
    this.router.get('/logout', this.logout);
    this.router.post('/register/', this.register);
    this.router.get('/forgotten/', this.forgotten);
    this.router.get('/associations', this.isLoggedIn, this.getUserAssociations);
    this.router.post('/associations', this.isLoggedIn, this.setCurrentAssociation);
    this.router.get('/', this.loggedin);
  }
}

const userRoutes = new UserRouter().router;

export default userRoutes;
