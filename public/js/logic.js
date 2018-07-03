//$(document).ready(function() {

var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Batman9!",
  database: "entries"
});

var wins = 0;

var letterValues = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
}

var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

var randomPOS = partsOfSpeechArray[Math.floor(Math.random()*partsOfSpeechArray.length)];
//console.log(randomPOS); //ok

var randomLength = Math.floor(Math.random() * (10 - 4) ) + 4; //generate random word length
//console.log(randomLength); //ok

var answerArray = [];

function generateBlanks() {
    for (t=0; t=randomLength; t++) {
        answerArray.push("_ ");
        $(".answerSpace").append(answerArray); //$ is not defined??????????????????????
        //need to identify position of each space??
    }
}
generateBlanks();

var targetScore = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- is 7-30 the right range?????
//console.log(targetScore); //ok


var timer = function() {
    var secondsLeft = 30;
    $(".timer-container").append("<p><span class='timer'></span></p><br>"); // $ IS NOT DEFINED???????!!!!!!!!
    timer = setInterval(function() { //every second...
        secondsLeft--; //decrease seconds left by 1
        $(".timer").text(secondsLeft); //display seconds left
        if (secondsLeft === 0) { //if time runs out...
            clearInterval(timer);  //stop timer
            endGame();
            }
    }, 1000);
    console.log(secondsLeft);
}
timer();


$("#letter").on("click", function() {
    //append each letter to answer array and re-print the array
    var letterGuessed; /////////////////////
    answerArray.push(letterGuessed);
    $(".answerSpace").html = answerArray.join(" ");
    return answerArray;
});


$(".clear").on("click", function() {
    answerArray = [];
    for (var z=0; z=randomLength; z++) { 
        $("#answerSpace").html("_ ");
    }
});


$(".submit").on("click", function() {
    //check to make sure all blanks were filled in
    var scoreArray = [];
    for (var a=0; a<answerArray.length; a++) { //
        if (answerArray[a] in letterValues) {
            var letterScore = letterValues.lettersGuessed[a]; //grab value of each letter
            scoreArray.push(letterScore); //push to array to calculate total word value
            var sum;
            for (var b=0; b<scoreArray.length; b++) {
                sum += scoreArray[b]; //calculate total word value
            };
            return sum;
            if (sum == targetScore) {
                
            //query db; if string matches any word in database...
                connection.query(
                    "SELECT word,wordtype FROM entries WHERE CHAR_LENGTH(word) BETWEEN 4 AND 15",
                    function(err, results) {
                        //console.log(results);
                        if (results.indexOf(guessedWord) >= 0) { //if guessed word is found in dictionary...
                            //if part of speech of that matching word from dictionary matches random POS...
                                //winner modal
                        }
                    });

            } else {
                endGame();
            }
            //compare to target score
        }
    };
    return answerArray;
    var guessedWord = answerArray.toString();
    

    function endGame() { //lost game
        //modal with option to restart game
    };

    function winner() { //won game
        wins++;
        //calculate score
        //modal with option to proceed to the next round
    };



    //losing conditions:
    //time runs out
    //score doesn't match target score
    //word not found in dictionary
    //word found but part of speech is wrong

                    


});
//});


////////////////////////////////////////////////////////////////////////////////////////
    
/*
        //function arrayContains(needle, arrhaystack){
          //  return (arrhaystack.indexOf(needle) > -1);
        //}
        

            if( !arraysEqual(word,answerArray)){
                //checking that only letters are submitted and that the array doesn't already have the letter
                if (!/[^a-zA-Z]/.test(guess) && !arrayContains(guess,lettersGuessed)){
                    //checking that array doesn't already have the letter 
                    if(!arrayContains(guess,word)){
                        lettersGuessed.push(guess);
                        document.querySelector("#lettersGuessed").innerHTML ="Letters already guessed: " + lettersGuessed.join("  ");    
                        remainingGuesses--;
                        document.querySelector("#score").innerHTML = "Remaining guesses: " + remainingGuesses;
                    }
                    //updating answerArray
                    for (var j= 0; j<word.length; j++){
                        if (word[j] === guess) {
                            answerArray[j] = guess;
                            document.querySelector("#currentWord").innerHTML = answerArray.join(" ");
                        }  
                    } 
                }
            }else{
                //adds wins and restarts game
                numberWins++;
                pickWord();
            }
            */