"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const roles_1 = require("../config/roles");
const emailer_factory_1 = require("../factories/emailer-factory");
const schemas_1 = require("../schema/schemas");
const user_1 = require("../schema/user");
const bugsnag_1 = require("../config/bugsnag");
const passportRedirect = {};
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    login(req, res, next) {
        console.log("Login route hit");
        if (req.user.role === roles_1.roles.ADMIN) {
            return schemas_1.Association.findAll({
                attributes: ['id', 'name'],
            })
                .then((associations) => {
                req.session.associationId = associations[0].id;
                res.send(req.user);
            })
                .catch((error) => {
                bugsnag_1.bugsnagClient.notify(error);
                res.sendStatus(500);
            });
        }
        req.user
            .getAvailableAssociations()
            .then((associations) => {
            req.session.associationId = associations[0].id;
            res.send(req.user);
        })
            .catch((error) => {
            bugsnag_1.bugsnagClient.notify(error);
            res.sendStatus(500);
        });
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
        req.user
            .getAvailableAssociations()
            .then((associations) => {
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
        <p>To reset your password click <a href="hoadirector.com/forgotten-password/${token.token}">here</a></p>
        <p>or use the following link: hoadirector.com/forgotten-password/${token.token}</p>
        `,
            };
            return emailer.sendMail(emailOptions);
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
                    as: 'tokens',
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
        this.router.post('/login/', passport.authenticate('local', passportRedirect), this.login);
        this.router.get('/logout', this.logout);
        this.router.post('/register/', this.register);
        this.router.get('/forgotten/', this.forgotten);
        this.router.post('/forgotten/', this.changeForgottenPassword);
        this.router.get('/associations', this.isLoggedIn, this.getUserAssociations);
        this.router.post('/associations', this.isLoggedIn, this.setCurrentAssociation);
        this.router.get('/', this.loggedin);
    }
}
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter().router;
exports.default = userRoutes;
//# sourceMappingURL=user.js.map