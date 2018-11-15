module.exports = function(app) {
    app.get("/api/requests", function(req, res) {
      res.json(true);
    });
  
    app.get("/api/avail", function(req, res) {
      res.json(true);
    });
  };
  