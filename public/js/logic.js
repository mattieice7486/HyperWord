$(document).ready(function() {


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


    var won;
    var score;

    var letterValues = {
        a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
    }

    var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

    var randomPOS = partsOfSpeechArray[Math.floor(Math.random() * partsOfSpeechArray.length)];
    console.log(randomPOS);

    var randomLength = Math.floor(Math.random() * (10-4)) + 4; //generate random word length
    console.log("random length is " + randomLength); //ok

    var targetScore = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- is 7-30 the right range??
    console.log(targetScore);

    var answerArray;

    function generateBlanks() {
        answerArray = [];
        $("#answerSpace").empty();
        for (t=0; t<randomLength; t++) {
            answerArray.push("_ ");
        }
        $("#answerSpace").html(answerArray);
        //console.log("answer array length is " + answerArray.length) //ok
    }


///////////////////////////// BUTTON FUNCTIONALITY ////////////////////////////////

    $("#letter").on("click", function() { //fill in the blanks with letters guessed
        //console.log("letter works") //ok
        var letterGuessed = $("#letter").val(); //add "letter" ID and letter values (e.g. "A") to Amy's HTML!!!!
        var index = answerArray.indexOf("_ "); //find first blank in array
        if (index !== -1) {
            answerArray[index] = letterGuessed; //...and replace with letter
        }
        //answerArray.push(letterGuessed);
        console.log(answerArray);
        $("#answerSpace").html = answerArray.join(" ");
    });


    $("#clear").on("click", function() {
        //console.log("clear works") //ok
        generateBlanks();
    });


    $("#submit").on("click", function() {
        //console.log("submit works") //ok
        stop();
        checkIfWon();
    });



//////////////////////////////////////// TIMER ////////////////////////////////////////////

    var secondsLeft = 5;
    var intervalId;

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        secondsLeft--;
        $(".timer-container").text(secondsLeft);
        if (secondsLeft === 0) {
            stop();
            loss();
        }
        return secondsLeft;
    }

    function stop() {
        clearInterval(intervalId);
    }

    run();

////////////////////////////////////////////////////////////////////////////////////

    function loss() {
        stop();
        $("#lossModal").modal(); //modal with option to restart game
        won = false;
        return won;
    };

    function win() {
        stop();
        $("#winModal").modal(); //modal with option to proceed to next round
        return {
            score: score + secondsLeft * 10,
            won: true
        }
        //push score to the leaderboard
    };


//////////////////////////////////// DETERMINE WIN OR LOSS ///////////////////////////////////////

        function checkIfWon() {

            //check to make sure all blanks were filled in
            if (answerArray.indexOf("_") > -1) {
                loss();
            } else {

                //check to make sure the value of user's word matches the target score 
                var scoreArray = [];
                for (var a=0; a<answerArray.length; a++) {
                    if (answerArray[a] in letterValues) {
                        var letterScore = letterValues.answerArray[a]; //grab value of each letter
                        scoreArray.push(letterScore); //push to array
                        var sum;
                        for (var b=0; b<scoreArray.length; b++) {
                            sum += scoreArray[b]; //calculate total value
                        };
                        return sum;
                        console.log(sum);

                        //if word's value matches target value...
                        //if (sum === targetScore) {
                            
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
                                //need to calculate score
                        //} else {
                        //  loss();
                        //}
                    //}
                //};
            return answerArray;
            var guessedWord = answerArray.toString();
            console.log(guessedWord)
        }
    }
        } return won;
        //console.log(won); //doesn't work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }


    function startGame() {
        won = false;
        score = 0;
        generateBlanks();
        return won;
        console.log(won);
    }

///////////////////////////////////// CALLING FUNCTIONS ////////////////////////////////////////////

    
    startGame();

    if (won === true) {
        score += secondsLeft * 10;
        return score;
    }

    else if (won === false) {
        startGame(); //restart game
    }

});