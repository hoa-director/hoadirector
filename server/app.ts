const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
import * as express from "express";
import { NextFunction, Request, Response } from "express";
// import * as session from 'express-session';
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
    this.staticContent();
    this.middleware();
    this.routes();
    this.errorHandlers();
  }

  private middleware(): void {
    this.express.use(bugsnagExpress.requestHandler);
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(
      cookieSession({
        secret: serverSessionSecret || "secret",
        key: "user",
        resave: "false",
        saveUninitialized: false,
        maxAge: 60 * 60 * 1000, // Set to 1 hour - 60 min/hour * 60 s/min * 1000 ms/s
        secure: false,
      })
    );
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, OPTIONS"
      );
      next();
    });
  }

  private errorHandlers(): void {
    this.express.use(bugsnagExpress.errorHandler);
  }

  private staticContent(): void {
    this.express.use(
      express.static(path.join(__dirname, "public"), {
        maxAge: 31557600000,
      })
    );
  }

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
