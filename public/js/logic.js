//var mysql = require("mysql");

//search for functional hangman game on github

// create the connection information for the sql database
/*var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: null,
  database: "entries"
});*/



$(document).ready(function() {
    
    var wins = 0;

    var letterValues = {
        a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
    }

    var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

    var randomPOS = partsOfSpeechArray[Math.floor(Math.random() * partsOfSpeechArray.length)];

    var randomLength = Math.floor(Math.random() * (10-4)) + 4; //generate random word length
    console.log("random length is " + randomLength); //ok

    var answerArray = [];
    $("#answerSpace").html(answerArray);


//on load...
    function generateBlanks() {
        for (t=0; t<randomLength; t++) {
            answerArray.push("_ ");
            //need to identify position of each space?? how to make sure it switches to the next blank once the blank they're on is filled out? is there a way to associate first click with first blank, for instance?
        }
        $("#answerSpace").append(answerArray);
        console.log("answer array length is " + answerArray.length)
    }
    generateBlanks();
    

    var targetScore = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- is 7-30 the right range??


    var timer = function() { //should this be an object??
        var secondsLeft = 30;
        $(".timer-container").append("<p><span class='timer'></span></p><br>");
        setInterval(function() {
            secondsLeft--; //decrease seconds left by 1
            $(".timer").text(secondsLeft); //display seconds left
            if (secondsLeft === 0) { //if time runs out...
                loss(); //add stop timer to loss function; to clearInterval(timer) does timer need to be an object??
            } return secondsLeft; //?????????????
        }, 1000);
        //console.log(secondsLeft); //ok
    }
    //timer(); //needs to be called at some point
    



/*
var timer = {
    secondsLeft: 30,
    append: function() {
        $(".timer-container").append("<p><span class='timer'></span></p><br>")
    },
    set: {
        stop: function() {

        }
    }
///////////////////////////// need to merge these two ^ v
    function() {
        setInterval(function() {
            secondsLeft--;
            $(".timer").text(secondsLeft);
            if (secondsLeft === 0) {
                function stop() {
                clearInterval(timer);  //stop timer
                checkIfWon();
                }
            }
        }), 1000;
    }
}
timer.set.stop(); //?????
console.log(timer.set.stop());
*/



$("#letter").on("click", function() { //append each letter to answer array and re-print the array
    //console.log("letter works") //ok
    var letterGuessed = $("#letter").val(); //add "letter" ID and letter values (e.g. "A") to Amy's HTML!!!!!!!!!!!!!!!!!!!!!!
    answerArray.push(letterGuessed);
    console.log(answerArray); //working so far
    $("#answerSpace").html = answerArray.join(" ");
});


$("#clear").on("click", function() {
    //console.log("clear works") //ok
    //generateBlanks(); //needs to be deleted
    answerArray = [];
    for (var z=0; z=randomLength; z++) { 
        $("#answerSpace").html("_");
    }
});


$("#submit").on("click", function() {
    //console.log("submit works") //ok
    //stop timer

    checkIfWon();
});

//need function to restart game

//score calculated by time left (10 points per second left)
// LOSS IF HIT SUBMIT BUTTON!!!!!!!!!!!!!!!!!!!!!!!


function checkIfWon() {  //may need to move this outside the on click listener...

    //check to make sure all blanks were filled in
            if (answerArray.indexOf("_") >= 0) {
                loss();
            } else {

                //check to make sure the value of user's word matches the target score 
                var scoreArray = [];
                for (var a=0; a<answerArray.length; a++) {
                    if (answerArray[a] in letterValues) {
                        var letterScore = letterValues.answerArray[a]; //grab value of each letter
                        scoreArray.push(letterScore); //push to array to calculate total word value
                        var sum;
                        for (var b=0; b<scoreArray.length; b++) {
                            sum += scoreArray[b]; //total value
                        };
                        return sum;
                        console.log(sum);
                        if (sum === targetScore) { //if word's value matches target value...
                            
                        //query db to make sure user's word is found in the dictionary
                            /*connection.query(
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
                                }); */
                        } else {
                            loss();
                        }
                    }
                };
            return answerArray;
            var guessedWord = answerArray.toString();
            console.log(guessedWord)
}

    function loss() { //lost game
        //stop timer
        //to clearInterval(timer) does timer need to be an object??
        //modal with option to restart game
    };

    function win() { //won game
        wins++;
        //calculate score
        //modal with option to proceed to the next round
    };

}

});