"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailer_factory_1 = require("../factories/emailer-factory");
const schemas_1 = require("../schema/schemas");
const user_1 = require("../schema/user");
const bugsnag_1 = require("../config/bugsnag");
// import { ConsoleReporter } from 'jasmine';
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
// const passportRedirect: passport.AuthenticateOptions = {};
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    login(req, res, next) {
        // via authentication through passport, if the user successfully authenticates, the user can
        // be access with req.user
        // in this case the user based on the User model/schema
        console.log(req.body);
        console.log("Login route hit");
        var fetchedUser;
        user_1.default.findOne({
            where: {
                email: req.body.email,
            },
        }).then(user => {
            if (!user) {
                return res.status(401).json({ message: "Auth Failed" });
            }
            // returns a bool true/false for pass/fail
            fetchedUser = user;
            return user.comparePassword(req.body.password);
        })
            .then(result => {
            if (!result) {
                return res.status(401).json({ message: "Auth Failed" });
            }
            // if (fetchedUser.role === roles.ADMIN) {
            //   return Association.findAll({
            //     attributes: ['id', 'name'],
            //   })
            //     .then((associations) => {
            //       req.session.associationId = associations[0].id;
            //     })
            //     .catch((error) => {
            //       bugsnagClient.notify(error);
            //       res.sendStatus(500);
            //     });
            //   }
            // create the token to send to the client
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser.id }, process.env.SECRET, { expiresIn: "1h" });
            console.log(token);
            res.status(200)
                .json({
                token: token,
                user: fetchedUser
            });
        })
            .catch(err => {
            return res.status(401).json({ message: "Auth Failed" });
        });
        // if (req.user.role === roles.ADMIN) {
        //   return Association.findAll({
        //     attributes: ['id', 'name'],
        //   })
        //     .then((associations) => {
        //       req.session.associationId = associations[0].id;
        //       res.send(req.user);
        //     })
        //     .catch((error) => {
        //       bugsnagClient.notify(error);
        //       res.sendStatus(500);
        //     });
        // }
        // req.user
        //   .getAvailableAssociations()
        //   .then((associations) => {
        //     req.session.associationId = associations[0].id;
        //     res.send(req.user);
        //   })
        //   .catch((error) => {
        //     bugsnagClient.notify(error);
        //     res.sendStatus(500);
        //   });
    }
    logout(req, res, next) {
        req.logOut();
        res.send({});
    }
    loggedin(req, res, next) {
        if (req.isAuthenticated()) {
            res.send(req.user);
        }
        else {
            res.sendStatus(403);
        }
    }
    register(req, res, next) {
        const newUser = new user_1.UserSchema(req.body);
        newUser
            .save()
            .then((data) => {
            res.send(newUser);
        })
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.sendStatus(500);
        });
    }
    getUserAssociations(req, res, next) {
        var userId = req.params.id;
        console.log('user id get user associations is ' + userId);
        user_1.default.findOne({
            where: {
                id: userId,
            },
        }).then(user => {
            user
                .getAvailableAssociations()
                .then((associations) => {
                res.send({
                    associations
                    // currentAssociation: req.session.associationId,
                });
            })
                .catch((error) => {
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        });
    }
    setCurrentAssociation(req, res, next) {
        const associationId = parseInt(req.body.associationId, 10);
        req.user
            .getAvailableAssociations()
            .then((associations) => {
            if (!associations.some((association) => association.id === associationId)) {
                return res.sendStatus(403);
            }
            req.session.associationId = associationId;
            res.send({
                associations,
                currentAssociation: req.session.associationId,
            });
        })
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.sendStatus(500);
        });
    }
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.sendStatus(403);
    }
    forgotten(req, res, next) {
        const email = req.query.email;
        user_1.default.findOne({
            where: { email },
        })
            .then((user) => {
            const token = new schemas_1.ForgottenPasswordToken({ userId: user.id });
            return token.save();
        })
            .then((token) => {
            const emailer = emailer_factory_1.EmailerFactory.createEmailer();
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: "gellertjm@gmail.com",
                subject: "Reset Password",
                text: `
        A new password has been requested for ${email}.
        To reset your password use the following link: hoadirector.com/forgotten-password/${token.token}
        `,
                html: `
        <p>A new password has been requested for ${email}.</p>
        <p>To reset your password click <a href="hoadirector.com/forgotten-password/${token.token}">here</a></p>
        <p>or use the following link: hoadirector.com/forgotten-password/${token.token}</p>
        `,
            };
            return emailer.sendMail(mailOptions);
        })
            .then(() => {
            res.send({ sucess: true });
        })
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.status(500).send({ success: false });
        });
    }
    changeForgottenPassword(req, res, next) {
        const password = req.body.password;
        const token = req.body.token;
        user_1.default.findOne({
            include: [
                {
                    model: schemas_1.ForgottenPasswordToken,
                    as: "tokens",
                    where: {
                        token,
                    },
                },
            ],
        })
            .then((user) => {
            return user.changePassword(password);
        })
            .then((user) => {
            return user.tokens[0].destroy();
        })
            .then(() => {
            res.send({ sucess: true });
        })
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.status(500).send({ success: false });
        });
    }
    init() {
        // this.router.post(
        //   "/login/",
        //   passport.authenticate("local", passportRedirect),
        //   this.login
        // );
        this.router.post("/login/", this.login);
        this.router.get("/logout", this.logout);
        this.router.post("/register/", this.register);
        this.router.get("/forgotten/", this.forgotten);
        this.router.post("/forgotten/", this.changeForgottenPassword);
        this.router.get("/associations", checkAuth, this.getUserAssociations);
        this.router.post("/associations", checkAuth, this.setCurrentAssociation);
        this.router.get("/", checkAuth, this.loggedin);
    }
}
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter().router;
exports.default = userRoutes;
//# sourceMappingURL=user.js.map