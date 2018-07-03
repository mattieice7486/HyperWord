var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: null,
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
        $(".answerSpace").append(answerArray); //$ is not defined??????????????????????*****************************
        //need to identify position of each space?? how to make sure it switches to the next blank once the blank they're on is filled out? is there a way to associate first click with first blank, for instance?
    }
}
generateBlanks();

var targetScore = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- is 7-30 the right range?????
//console.log(targetScore); //ok


var timer = function() { //should i change this to an object??
    var secondsLeft = 30;
    $(".timer-container").append("<p><span class='timer'></span></p><br>"); // $ IS NOT DEFINED???????!!!!!!!!
    setInterval(function() {
        secondsLeft--; //decrease seconds left by 1
        $(".timer").text(secondsLeft); //display seconds left
        if (secondsLeft === 0) { //if time runs out...
            clearInterval(timer);  //stop timer
            checkIfWon();
        }
    }, 1000);
    console.log(secondsLeft);
}
timer();


/*
var timer = {
    secondsLeft: 30,
    append: function() {
        $(".timer-container").append("<p><span class='timer'></span></p><br>")
    },
    set: function() {
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
    var letterGuessed = $("#letter").val(); 
    answerArray.push(letterGuessed);
    console.log(answerArray);
    $(".answerSpace").html = answerArray.join(" ");
});


$(".clear").on("click", function() {
    answerArray = [];
    for (var z=0; z=randomLength; z++) { 
        $("#answerSpace").html("_ ");
    }
});



//need function to restart game

$(".submit").on("click", function() {
    
    //stop timer

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
                        if (sum === targetScore) { //if word's value matches target value...
                            
                        //query db to make sure user's word is found in the dictionary
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
                        } else {
                            loss();
                        }
                    }
                };
            return answerArray;
            var guessedWord = answerArray.toString();
}

    function loss() { //lost game
        //modal with option to restart game
    };

    function win() { //won game
        wins++;
        //calculate score
        //modal with option to proceed to the next round
    };

}
});


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
            }
            */