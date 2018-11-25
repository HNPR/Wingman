let keys = require("./keys");
const db = require("../models");

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((userID, done) => {
        db.User.findByPk(userID).then((user) => {
            done(null, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID: keys.google.id,
            clientSecret: keys.google.secret,
            callbackURL: "/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            // Check if user exists in our Users table
            // If user not found, then create new user in Users table
            db.User.findOne({
                where: {
                    googleID: profile.id
                }
            }).then((currentUser) => {
                if (currentUser) {
                    // already have this user
                    console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    db.User.create({
                        fullname: profile.displayName,
                        age: null,
                        gender: profile.gender,
                        emailAddress: profile.emails[0].value,
                        googleID: profile.id,
                        profilePhoto: profile.photos[0].value
                    }).then((newUser) => {
                        console.log('created new user: ', newUser);
                        done(null, newUser);
                    });

                }
            });
        }));
};