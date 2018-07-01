var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "entries"
});


var letterValues = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
}   


//score determined by time left on clock when round completed, number of rounds completed, ... 

var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

    $(document).ready(function() {
        var randomPOS = partsOfSpeechArray.sort(function(a, b) { //generate random part of speech
            return 0.5 - Math.random();
            document.getElementById("NOTSURE").innerHTML = partsOfSpeechArray;
        });
        return randomPOS;

        var randomLength = Math.floor(Math.random() * (10 - 4) ) + 4; //generate random word length

        var targetScore = Math.floor(Math.random() * (30 - 7) ) + 7; //generate random score -- is 7-30 the right range?????

        var timeout = setTimeout(function() { //once 30 seconds are up
            //modal saying they lost with option to play again
        }, 30000);

        //stop timeout if they win


    });




    $("#letter").on("click", function() {
        //print letters to blanks
    })


    $("#clear").on("click", function() {
        //clear blanks
    });


    $(".submit").on("click", function(lettersGuessedArray) {
        //check to make sure all blanks were filled in
        //grab letters in blanks
        var lettersGuessedArray = [];
        var scoreArray = [];
        for (var a=0; a<lettersGuessed.length; a++) {
            lettersGuessedArray.push(lettersGuessed[a]);
            //look for each letter in letterValues object;
            if (lettersGuessed[a] in letterValues) { //if it's there...
                var letterScore = letterValues.lettersGuessed[a]; //grab value
                scoreArray.push(letterScore); //push to array
                for (var b=0; b<scoreArray.length; b++) {
                    var sum;
                    sum += scoreArray[b]; //calculate total word value
                };
                return sum;
                if (sum == targetScore) {
                    

                //query db; if string matches word in database...
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
                    console.log("you lost!")
                }
                //compare to target score
            }
        };

        return lettersGuessedArray;
        var guessedWord = lettersGuessedArray.toString();
        



        //if all blanks have been filled out...
            //if score matches target score
                //if word is found in dictionary AND part of speech matches target part of speech...
                    //if part of speech, word length, and target score are what was requested...
                        //calculate score??
                        //display winner modal


        //losing conditions:
        //time runs out
        //score doesn't match target score
        //word not found in dictionary
        //word found but part of speech is wrong

                        


    });


    ////////////////////////////////////////////////////////////////////////////////////////
    



        var word = new Object();
        var answerArray = new Object();
        var remainingGuesses = new Object();
        var lettersGuessed = new Object();
        var numberWins = 0;
    
        function pickWord() {
            var numberWins = 0;
            var remainingGuesses = 0;
            var lettersGuessed = [" "];
            word = words[Math.floor(Math.random() * words.length)];
            answerArray = [];
            for (var i = 0; i < word.length; i++) {
                answerArray[i] = "_";
            }
            hangman(word);
        }

        pickWord();


        function hangman(word){

            lettersGuessed = [];

            function updateGuesses(){
                if(remainingGuesses != 0){
                    document.querySelector("#wins").innerHTML = "Number of Wins: " + numberWins;  
                    document.querySelector("#score").innerHTML = "Remaining guesses: " + remainingGuesses;
                    document.querySelector("#currentWord").innerHTML = answerArray.join(" ");
                    document.querySelector("#lettersGuessed").innerHTML =  "Letters already guessed: " + lettersGuessed.join("  ") ;
                }
            }
            function updateWord(){
                document.querySelector("#currentWord").innerHTML = answerArray.join(" ");
            }

            updateGuesses();
        }

        function arraysEqual(arr1, arr2) {
            for(var i = arr1.length; i--;) {
                if(arr1[i] !== arr2[i])
                return false;
            }
            return true;
        }

        function arrayContains(needle, arrhaystack){
            return (arrhaystack.indexOf(needle) > -1);
        }

        ///////////////////////////////////////////////////////////main
        
        document.onkeyup = function(event) {

            //If there are no more guesses function will stop.
            if (remainingGuesses === 0) {
                document.querySelector("#score").innerHTML = "You lose. The word was " + word +". You got " + numberWins + " wins in a row!" +"<p>" +" Press space to Restart!" +"<p>";        
                return;
            }
        
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
        };