// *********************************************************************************
// api-dictionary-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our model
var db = require("../models");
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the entries
  app.get("/api/entries/", function(req, res) {
    db.Dictionary.findAll({})
      .then(function(dbDictionary) {
        res.json(dbDictionary);
      });
  });

  app.get("/api/all", function(req, res) {
    var dbQuery = "SELECT * FROM entries";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/nouns", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'n.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/verbs", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'v.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/adjectives", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'a.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/adverbs", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'adv.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/pronouns", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'pron.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/prepositions", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'prep.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/conjunctions", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'conj.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/interjections", function(req, res) {
    var dbQuery = "SELECT * FROM entries WHERE wordtype = 'interj.'";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // Get route for returning ### of a specific category
  app.get("/api/entries/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/###/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/###", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting ###
  app.delete("/api/###/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating ###
  app.put("/api/###", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
