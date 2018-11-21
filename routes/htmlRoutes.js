// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const passport = require('passport');


// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // route leads to landing/login page
    app.get("/", function (req, res) {
        if (req.session.token) {
          console.log(req.session);
          res.cookie('token', req.session.token);
          res.json({
            status: 'session cookie set'
          });
        } else {
          res.cookie('token', '');
          // res.sendFile(path.join(__dirname, "../public/html/login2.html"));
          res.json({
            status: 'session cookie not set'
          });
        }});

      // route leads to page where user can choose a requested walk to volunteer for
      app.get("/volunteer", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/grid.html"));
      });

      // route leads to page where user can create profile without using Google
      app.get("/new", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/walkerEntry.html"));
      });

      // route leads to user profile page
      // this route will need some additional info to have it correctly route to an individual user
      app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/walker-walkee.html"));
      });

      // route leads to page where user can create a new request for a walk
      app.get("/request", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/walk-request.html"));
      });

      // route leads to user profile page
      app.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/aboutWingman.html"));
      });

      app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
      }));

      app.get('/auth/google/callback',
        passport.authenticate('google', {
          failureRedirect: '/'
        }),
        (req, res) => {
          // console.log(req.user);
          console.log(`Google ID: ${req.user.profile.id}`)
          console.log(`Display Name: ${req.user.profile.displayName}`)
          req.session.token = req.user.token;
          req.session.googleID = req.user.profile.id;
          req.session.displayName = req.user.profile.displayName;

          res.redirect('/');
        }
      );

      app.get('/logout', (req, res) => {
        req.logout();
        req.session = null;
        res.redirect('/');
      });

      // If no matching route is found default to login page
      app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/login2.html"));
      });
    };