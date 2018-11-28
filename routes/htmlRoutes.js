// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const passport = require('passport');

// Middleware to check if a user is logged in
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    // User is authenticated, proceed to route
    next();
  } else {
    console.log("NEED LOGIN!")
    // User is not authenticated, proceed to login page
    res.redirect('/login');
  }
}

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // route leads to page where user can choose a requested walk to volunteer for
  app.get("/volunteer", isUserAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/volunteer.html"));
  });

  // route leads to page where user can create profile without using Google
  // app.get("/new", function (req, res) {
  // res.sendFile(path.join(__dirname, "../public/html/walkerEntry.html"));
  // });

  // route leads to user profile page
  // this route will need some additional info to have it correctly route to an individual user
  app.get("/profile", isUserAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/profile.html"));
  });

  // route leads to page where user can create a new request for a walk
  app.get("/request", isUserAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/walkRequest.html"));
  });

  // route leads to about Wingman page
  app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/aboutWingman.html"));
  });

  // route to use PassportJS to authenticate using Google, OAuth scopes for Google user profile and email
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  }));

  // Callback route after user has approved/denied oAuth
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/'
    }),
    (req, res) => {
      // Cookie for front-end to use as current user ID
      res.cookie('userID', req.user.id);
      res.redirect('/');
    }
  );

  // route to login page
  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  // route to logout current user
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

  // If no matching route is found, default to login page if not logged in, or profile page if logged in
  app.get("*", isUserAuthenticated, function (req, res) {
    res.redirect('/profile');
  });
};