import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { User } from '../schema/schemas';
// import User from '../schema/user';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch(error => {
        done(error);
    })
})

passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    console.log('in local strategy');
    User.findByEmail(email).then(user => {
        if(!user || !user.comparePassword(password)) {
            return done(null, false, { message: 'Incorrect username or password' })
        }
        return done(null, user);
    }).catch(error => {
        console.log(error);
        return done(error);
    });
}));

export default passport;