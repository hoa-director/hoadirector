import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as session from 'express-session';
import * as path from 'path';
import passport from './config/passport';
import indexRoutes from './routes';
import apiRoutes from './routes/api';
import userRoutes from './routes/user';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.staticContent();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(
      session({ secret: process.env.SESSION_SECRET, resave: false }),
    );
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  private staticContent(): void {
    this.express.use(
      express.static(path.join(__dirname, 'public'), {
        maxAge: 31557600000,
      }),
    );
  }

  private isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.sendStatus(403);
  }

  private routes(): void {
    this.express.use('/api/', this.isLoggedIn, apiRoutes);
    this.express.use('/user/', userRoutes);
    this.express.use('/users/', userRoutes);
    this.express.use('/*', indexRoutes);
  }
}

export default new App().express;
