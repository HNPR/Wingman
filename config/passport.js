let keys = require("./keys")

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: keys.google.id,
            clientSecret: keys.google.secret,
            callbackURL: "/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            // check if user exists in our Users table
            // if not, then create new user in Users table
            
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};