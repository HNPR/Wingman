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
    console.log("at /, printing req.user")
    console.log(req.user);
    if (req.session.token) {
      console.log(req.session);
      res.cookie('token', req.session.token);
      res.cookie('displayName', req.session.displayName);
      res.cookie('googleID', req.session.googleID);
      res.cookie('profilePic', req.session.profilePic);
      res.sendFile(path.join(__dirname, "../public/html/walker-walkee.html"));
      // res.json({
      //   status: 'session cookie set'
      // });
    } else {
      res.cookie('token', '');
      res.sendFile(path.join(__dirname, "../public/html/login2.html"));
      // res.json({
      //   status: 'session cookie not set'
      // });
    }
  });

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
      console.log("at /auth/google/callback, printing req.user");
      console.log(req.user);
      // console.log(req.user.profile.photos[0].value);
      // console.log(`Google ID: ${req.user.profile.id}`)
      // console.log(`Display Name: ${req.user.profile.displayName}`)
      req.session.token = req.user.token;
      req.session.googleID = req.user.profile.id;
      req.session.displayName = req.user.profile.displayName;
      req.session.profilePic = req.user.profile.photos[0].value;
      
      res.redirect('/');
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    // Clear out all cookie values
    cookie = req.cookies;
    for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
        continue;
      }
      res.cookie(prop, '', {
        expires: new Date(0)
      });
    }
    res.redirect('/');
  });

  // If no matching route is found default to login page
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/login2.html"));
  });
};