var db = require("../models");

module.exports = function(app) {

// Find all users and return them tot he user with res.json
    app.get("/api/users", function(req, res) {
      db.User.findAll({}).then(function(dbUser){
        res.json(dbUser);
      });
    });
  
// Find one User with the id in req.params.id and return them to the user with res.json 
    app.get("/api/users/:id", function(req, res) {
      db.User.findOne({
        where: {
          id: req.params.user_id
        }
      }).then(function(dbUser){
        res.json(dbUser);
      });
    });

  // Create a User with the data available to us in req.body
  app.post("/api/users", function(req, res) {  
  console.log(req.body);
    db.User.create(req.body).then(function(dbAuthor) {
      res.json(dbUser);
    });
  });

  // Delete the User with the id available to us in req.params.id
  app.delete("/api/users/:id", function(req, res) {
    db.user.destroy({
      where: {
        id: req.params.user_id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  }); 
  };
  