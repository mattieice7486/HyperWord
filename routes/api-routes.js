// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var userData = require("../data/userData");
var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

// module.exports = function(app) {
//   // API GET Requests
//   // Below code handles when users "visit" a page.
//   // In each of the below cases when a user visits a link
//   // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//   // ---------------------------------------------------------------------------


// };



// login
const db = require("../models");
const Op = require('sequelize').Op;




module.exports = (app) => {
  app.get("/api/scores", function(req, res) {
    res.json(userData);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(waitListData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the userData array)
  // ---------------------------------------------------------------------------

  app.post("/api/scores", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    if (userData.length < 10) {
      userData.push(req.body);
      res.json(true);
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    userData = [];
    waitListData = [];

    console.log(userData);
  });
  // POST route for logging in
  app.post("/login", async(req, res, next) => {
    try {
      let account = await db.Account.findOne({
        where: {
          [Op.or]: [
            {username: req.body.username}
          ]
        }
      });

      let valid = await account.validPassword(req.body.password);

      if (!valid) {
        //next({status: 401, message: 'Username/Password Wrong!'});
        res.redirect('/login');

      }

      // res.status(200).send(res.jwt({
      //   id: account.id,
      //   username: account.username
      // }));

      res.redirect('/hyperword');


    } catch (error) {
      //next({status: 401, message: 'Username/Password Wrong!!!'});
      //console.log(error);
      res.redirect('/login');

    }
  });
};