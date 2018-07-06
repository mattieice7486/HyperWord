// NEXT STEPS:
    //FIGURE OUT HOW TO QUERY DICTIONARY DB AND PUSH TO LEADERBOARD FROM HERE -- need to trigger win
    //NEED TO WORK ON GETTING STARTGAME TO RETURN WIN OR LOSS - good progress
    //INSERT AMY'S KEYBOARD AND ADD ID AND VALUES - will do later

    



$(document).ready(function() {

    var winningScore;
    var won;

    function targetScore() {
        var target = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- right range??
        return target;
    }
    //console.log(targetScore()); //ok

    function randomPOS() {
        var POS = partsOfSpeechArray[Math.floor(Math.random() * partsOfSpeechArray.length)];
        $("#POS").html(POS);
        return POS;
    }

    function randomLength() {
        var random = Math.floor(Math.random() * (10-4)) + 4;
        return random;
    } 

    var letterValues = {
        "a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2, "h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3, "q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4, "z": 10
    }

    var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

    var answerArray = [];



///////////////////////////// BUTTON FUNCTIONALITY ////////////////////////////////

    $(".letter").on("click", function() { //fill in the blanks
        //console.log("letter works") //ok
        var letterGuessed = $(this).val(); //add "letter" class and letter values (e.g. "A") to Amy's HTML!!!!
        //console.log(letterGuessed); //ok
        var index = answerArray.indexOf("_ "); //find first blank in array
        if (index !== -1) {
            answerArray[index] = letterGuessed; //...and replace with letter
        }
        //answerArray.push(letterGuessed);
        //console.log(answerArray);
        answerArray.join(" ");
        $("#answerSpace").html(answerArray);
    });


    $("#clear").on("click", function() {
        //console.log("clear works") //ok
        function newBlanks() {
            var length = answerArray.length;
            //console.log(length); //ok
            $("#answerSpace").empty();
            for (t=0; t<length; t++) {
                answerArray.splice(t, 1, "_ ");
                //replace (don't push) all array items with blanks
            }
            //console.log(answerArray);
            $("#answerSpace").html(answerArray);
            //console.log("answer array length is " + answerArray.length) //ok
        }
        newBlanks();
    });


    $("#submit").on("click", function() {
        //console.log("submit works") //ok
        stop();
        checkIfWon();
        //console.log(answerArray)
    });


    $("#yes-lost").on("click", function() {
        //refresh page
        location.reload();
    });


    $("#no-lost").on("click", function() {
        $("#thanksForPlaying").modal();
    });


    $("#yes-won").on("click", function() { // need to test this!!!!!!!!!!
        //go to next round
        won = true;
        startGame();
    });


    $("#no-won").on("click", function() {
        $("#thanksForPlaying").modal();
    });



//////////////////////////////////////// TIMER ////////////////////////////////////////////

    var secondsLeft = 15;
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
            //console.log(won); //ok
            return won;
        }
        return secondsLeft;
    }

    function stop() {
        clearInterval(intervalId);
    }


////////////////////////////////////////////////////////////////////////////////////

    function loss() {
        stop();
        $("#lossModal").modal(); //modal with option to restart game
        won = false;
        //console.log(won); //ok
        return won;
    };


    function win() {
        stop();
        $.ajax({
            type: "POST",
            url: "/api/scores"
            //data: guessedWord //pass data through this variable
        }).then(function(data) {
        
            console.log(data);
            $("#winModal").modal(); //modal with option to proceed to next round
            
            console.log(winningScore)
            console.log(won) //////////////won't work until get server hooked up

            return {
                winningScore: winningScore + secondsLeft * 10,
                won: true
            };
            
        });
    };


//////////////////////////////////// DETERMINE WIN OR LOSS ///////////////////////////////////////

    function checkIfWon() {

        //check to make sure all blanks were filled in
        if (answerArray.indexOf("_ ") > -1) {
            loss();
            //console.log(won); //ok
            return won;
            //console.log("blanks remaining") //ok
        } else {
            //console.log("no blanks left") //ok

            var x = Object.keys(letterValues); //list of letters
            //console.log(x); //ok
            //check to make sure the value of user's word matches the target score 
            var scoreArray = [];
            for (var a=0; a<answerArray.length; a++) {
                if (x.indexOf(answerArray[a]) > 0) {
                    //console.log("found letter") //ok
                    var letterScore = letterValues[answerArray[a]]; //grab value of each letter
                    //console.log(letterScore); //ok
                    scoreArray.push(letterScore); //push to array
                    //console.log(scoreArray); //ok
                    var sum;
                    for (var b=0; b<scoreArray.length; b++) {
                        sum += scoreArray[b]; //calculate word's total value
                    };
                    console.log(typeof sum) //number!!
                    console.log(sum) //NaN!!!!!!!!!!!!!!!!!!
                    //if word's value matches target value...
                    if (sum === targetScore()) {
                        console.log("matching target score");

                    //query db to make sure user's word is found in the dictionary
                        $.ajax({
                            type: "GET",
                            url: "/api/all"
                            //data: guessedWord //pass data through this variable
                        }).then(function(results) {
                            console.log(results);
                            console.log(results[0].word);
                            if (results.indexOf(guessedWord) >= 0) { //if guessed word is found in dictionary...
                                console.log(results.indexOf(guessedWord));
                                var position = (results.indexOf(guessedWord)); //?????
                                //if part of speech matches randomly generated one...
                                if (randomPOS() == results.position.wordtype) { //not sure about this part
                                    win();
                                    console.log(won); /////
                                    return won;       
                                } else {
                                    loss();
                                    console.log(won); /////
                                    return won;                        
                                }
                            } else {
                                loss();
                                console.log(won); /////
                                return won;                    
                            }
                    })
                    } else {
                        loss();
                    }
                           
                } else { 
                    loss();
                    console.log(won); /////
                    return won;
                }
            }
            var guessedWord = answerArray.join("");
            //console.log(guessedWord) //ok
        } 
                                    
                    return won;
                    console.log(won); /////
              
    }

/////////////////////////////////////////////////////////////////////////////////////////////////

    function startGame() {

        randomPOS();
        randomLength();
        targetScore(); //generate random score -- right range??
    
        //console.log(targetScore()); //ok
        //console.log(randomLength()) //ok
        //console.log(randomPOS()) //ok

        // NOW SUBMIT BUTTON DOESN'T ALWAYS GENERATE WIN OR LOSS //


        run();

        function generateBlanks() {
            answerArray = [];
            $("#answerSpace").empty();
            for (t=0; t<randomLength(); t++) {
                answerArray.push("_ ");
            }
            $("#answerSpace").html(answerArray);
            return answerArray;
            //console.log("answer array length is " + answerArray.length) //ok
        }
    
        //console.log(targetScore); //ok
        generateBlanks();

        console.log(won); //undefined
        return targetScore, won;

    }


///////////////////////////////////// CALLING FUNCTIONS ////////////////////////////////////////////
    
    //on load...
    startGame();

    console.log(won); // UNDEFINED -- need to get it recognize true or false at this level

    if (won === true) {
        winningScore += secondsLeft * 10; //carry over score to next round
        console.log("Nice work! You earned " + winningScore + " points.");
        startGame();
    }

    else if (won === false) {
        winningScore = 0;
        startGame(); //restart game
    }


});