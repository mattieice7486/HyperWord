var Sequelize = require("sequelize");

// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize("entries", "root", "password", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

// Creates an "entries" model that matches up with DB
var entries = sequelize.define("entries", {
    word: {
        type: Sequelize.STRING,
        validate: {
            len: [4,15]    
        } 
    },
    wordtype: Sequelize.STRING
});

// Syncs with DB
entries.sync();

//pull all matching entries
entries.findAll({}).then (function(results) {
    console.log(results);
});

// Makes the Book Model available for other files (will also create a table)
module.exports = entries;