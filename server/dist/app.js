"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require("express");
// import * as session from 'express-session';
const path = require("path");
const bugsnag_1 = require("./config/bugsnag");
const passport_1 = require("./config/passport");
const routes_1 = require("./routes");
const api_1 = require("./routes/api");
const user_1 = require("./routes/user");
const bugsnagExpress = bugsnag_1.bugsnagClient.getPlugin('express');
const serverSessionSecret = process.env.SESSION_SECRET;
class App {
    constructor() {
        this.express = express();
        this.staticContent();
        this.middleware();
        this.routes();
        this.errorHandlers();
    }
    middleware() {
        this.express.use(bugsnagExpress.requestHandler);
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(cookieSession({
            secret: serverSessionSecret || 'secret',
            key: 'user',
            resave: 'false',
            saveUninitialized: false,
            maxAge: 60 * 60 * 1000,
            secure: false
        }));
        this.express.use(passport_1.default.initialize());
        this.express.use(passport_1.default.session());
    }
    errorHandlers() {
        this.express.use(bugsnagExpress.errorHandler);
    }
    staticContent() {
        this.express.use(express.static(path.join(__dirname, 'public'), {
            maxAge: 31557600000,
        }));
    }
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.sendStatus(403);
    }
    routes() {
        this.express.use('/api/', this.isLoggedIn, api_1.default);
        this.express.use('/user/', user_1.default);
        this.express.use('/users/', user_1.default);
        this.express.use('/*', routes_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map