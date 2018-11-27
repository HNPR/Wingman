var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function (app) {

  // GET route for getting all of the requested walks that are incomplete
  app.get("/api/walks/incomp/:userID", function (req, res) {
    db.Walk.findAll({
      where: {
        completed: false,
        // requesterID is not equal to user ID so that current user's requests don't show up for them to volunteer
        requesterID: {[Sequelize.Op.ne]: req.params.userID},
        volunteerID: ""
      }, include: [{model: db.User}]
    }).then(function (dbWalk) {
      // console.log(dbWalk.Walk[0].dataValues[0].User)
      res.json(dbWalk);
    });
  });

  // Get route for retrieving a single user's requested walks
  app.get("/api/walks/:requesterID", function (req, res) {
    db.Walk.findAll({
      where: {
        requesterID: req.params.requesterID
      }
    }).then(function (dbWalk) {
      res.json(dbWalk);
    });
  });

  // Get route for retrieving a single user's volunteered for walks
  app.get("/api/walks/vol/:volunteerID", function (req, res) {
    db.Walk.findAll({
      where: {
        volunteerID: req.params.volunteerID
      }
    }).then(function (dbWalk) {
      res.json(dbWalk);
    });
  });


  // POST route for saving a new walk
  app.post("/api/walks", function (req, res) {
    db.Walk.create(req.body).then(function (dbWalk) {
      res.json(dbWalk);
    });
  });

  // DELETE route for deleting walks
  app.delete("/api/walks/:id", function (req, res) {
    db.Walk.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbWalk) {
      res.json(dbWalk);
    });
  });

};