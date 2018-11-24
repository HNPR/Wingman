var db = require("../models");

module.exports = function(app) {

// GET route for getting all of the requested walks
app.get("/api/walks", function(req, res) {
    db.Walk.findAll({
      where: {
        // completed: is false => Ping! I do not know how to accomplish this
      }
    }).then(function(dbWalk) {
      res.json(dbWalk);
    });
  });

  // Get route for retrieving a single user's requested walks
  app.get("/api/walks/:id", function(req, res) {
    db.Walk.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbWalk) {
      res.json(dbWalk);
    });
  });

  // POST route for saving a new walk
  app.post("/api/walks", function(req, res) {
    db.Walk.create(req.body).then(function(dbWalk) {
      res.json(dbWalk);
    });
  });

  // DELETE route for deleting walks
  app.delete("/api/walks/:id", function(req, res) {
    db.Walk.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbWalk) {
      res.json(dbWalk);
    });
  });

};