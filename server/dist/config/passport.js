"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passportLocal = require("passport-local");
const schemas_1 = require("../schema/schemas");
passport.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport.deserializeUser((id, done) => {
    return schemas_1.User.findByPk(id)
        .then((user) => {
        done(undefined, user);
    })
        .catch((error) => {
        done(error);
    });
});
passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    return schemas_1.User.findByEmail(email)
        .then((user) => {
        if (!user || !user.comparePassword(password)) {
            return done(undefined, false, {
                message: 'Incorrect username or password',
            });
        }
        return done(undefined, user);
    })
        .catch((error) => {
        console.log(error);
        return done(error);
    });
}));
exports.default = passport;
//# sourceMappingURL=passport.js.map