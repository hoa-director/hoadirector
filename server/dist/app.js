"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
var cors = require('cors');
const express = require("express");
const session = require("express-session");
const bugsnag_1 = require("./config/bugsnag");
const passport_1 = require("./config/passport");
const routes_1 = require("./routes");
const api_1 = require("./routes/api");
const user_1 = require("./routes/user");
const checkAuth = require("./middleware/check-auth");
const bugsnagExpress = bugsnag_1.bugsnagClient.getPlugin("express");
const serverSessionSecret = process.env.SESSION_SECRET;
class App {
    constructor() {
        this.express = express();
        this.express.use(cors());
        // this.staticContent();
        this.middleware();
        this.routes();
        this.errorHandlers();
    }
    middleware() {
        this.express.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
            next();
        });
        this.express.use(bugsnagExpress.requestHandler);
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(session({ secret: serverSessionSecret, resave: false }));
        this.express.use(passport_1.default.initialize());
        this.express.use(passport_1.default.session());
    }
    errorHandlers() {
        this.express.use(bugsnagExpress.errorHandler);
    }
    // private staticContent(): void {
    //   this.express.use(
    //     express.static(path.join(__dirname, "public"), {
    //       maxAge: 31557600000,
    //     })
    //   );
    // }
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.sendStatus(403);
    }
    routes() {
        this.express.use("/api/", checkAuth, api_1.default);
        // this.express.use("/api/", apiRoutes);
        this.express.use("/user/", user_1.default);
        this.express.use("/users/", user_1.default);
        this.express.use("/*", routes_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map