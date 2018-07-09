// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // replace ### with relevant file name for a .html file
  app.get("/leaderboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
  });

  // replace #### with relevant file name for a .html file
  app.get("/score", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/score.html"));
  });

  // replace #### with relevant file name for a .html file
  app.get("/bootstrap", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/bootstrap.html"));
  });

  // replace #### with relevant file name for a .html file
  app.get("/game", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

  // replace #### with relevant file name for a .html file
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

};
