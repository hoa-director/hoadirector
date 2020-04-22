const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
var cors = require('cors');
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as session from 'express-session';
import * as path from "path";
import { bugsnagClient } from "./config/bugsnag";
import passport from "./config/passport";
import indexRoutes from "./routes";
import apiRoutes from "./routes/api";
import userRoutes from "./routes/user";

const bugsnagExpress = bugsnagClient.getPlugin("express");

const serverSessionSecret = process.env.SESSION_SECRET;

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(cors())
    // this.staticContent();
    this.middleware();
    this.routes();
    this.errorHandlers();
  }

  private middleware(): void {
    // this.express.use((req: Request, res: Response, next: NextFunction) => {
    //   res.setHeader("Access-Control-Allow-Credentials", "true");
    //   res.setHeader("Access-Control-Allow-Origin", "*");
    //   res.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    //   );
    //   res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "GET, POST, DELETE, PUT, OPTIONS"
    //   );
    //   next();
    // });
    this.express.use(bugsnagExpress.requestHandler);
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(
      session({ secret: serverSessionSecret, resave: false }),
    );
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    
    // this.express.use((req: Request, res: Response, next: NextFunction) => {
    //   res.header('Access-Control-Allow-Credentials', "true");
    //   res.header('Access-Control-Allow-Origin', "*");
    //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    //   if ('OPTIONS' == req.method) {
    //        res.send(200);
    //    } else {
    //        next();
    //    }
    //   });
  }

  private errorHandlers(): void {
    this.express.use(bugsnagExpress.errorHandler);
  }

  // private staticContent(): void {
  //   this.express.use(
  //     express.static(path.join(__dirname, "public"), {
  //       maxAge: 31557600000,
  //     })
  //   );
  // }

  private isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.sendStatus(403);
  }

  private routes(): void {
    this.express.use("/api/", this.isLoggedIn, apiRoutes);
    this.express.use("/user/", userRoutes);
    this.express.use("/users/", userRoutes);
    this.express.use("/*", indexRoutes);
  }
}

export default new App().express;
