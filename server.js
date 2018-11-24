// Set up enviornment variables
require("dotenv").config();
let keys = require("./config/keys")

// Sets up the Express App
// =============================================================
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

// Set up cookies
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [keys.cookie.key],
  maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

// Set up PassportJS for OAuth
// =============================================================
const passport = require('passport');
const auth = require('./config/passport');
auth(passport);
app.use(passport.initialize());
// Note: this is needed to pass around the req.user object while user is logged in
app.use(passport.session());

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/user-apiRoutes.js")(app);
require("./routes/walk-apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("Wingman app listening on PORT " + PORT);
  });
});
