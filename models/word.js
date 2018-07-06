// Creates a "Chirp" model that matches up with DB

var Sequelize = require("sequelize");

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

   var entries = sequelize.define("entries", { //all words with length between 4 and 15 letters
        word: {
            type: Sequelize.STRING,
            validate: {
                len: [4,15]    
            } 
        },
        wordtype: Sequelize.STRING,
            // Other attributes here
    });


entries.sync({
	force: true //forces to drop table name if exists
}).then(function() {
	return entries.create({
        country: "Afghanistan",
        phoneCode: 93,
        capital: "Kabul",
        independenceYear: 1919
    })
});


/*entries.findAll({
	where: {
        word: { /////////////////////????????
            char_length: {
                min: 4,
                max: 15
            }
        }
    },
    validate: {
        len: [4,15]
    }
})


entries.findAll({
    where: sequelize.where(sequelize.fn("char_length", sequelize.col(word)), 6) //BETWEEN 4 AND 15????
})
*/



////////////////////////////////////////////////////////////////////////////////////////


var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var Book = sequelize.define("book", {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  genre: Sequelize.STRING,
  pages: Sequelize.INTEGER
});

// Syncs with DB
Book.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Book;


////////////////////////////////////////////////////////////////////////////////////////


connection.query(
    "SELECT word,wordtype FROM entries WHERE CHAR_LENGTH(word) BETWEEN 4 AND 15",
    function(err, results) {
        if (results.indexOf(guessedWord) >= 0) { //if guessed word is found in dictionary...
            //console.log(results.indexOf(guessedWord));
            var position = (results.indexOf(guessedWord));
            //if part of speech of that matching word from dictionary matches randomly generated one...
            if (randomPOS == results.position.wordtype) { //not sure about this
                win();
            }       
            else {
                loss();
            }
        } else {
            loss();
        }
    });