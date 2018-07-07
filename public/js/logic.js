// NEXT STEPS:
    //FIGURE OUT HOW TO QUERY DICTIONARY DB AND PUSH TO LEADERBOARD FROM HERE -- need to trigger win
    //NEED TO WORK ON GETTING STARTGAME TO RETURN WIN OR LOSS - good progress
    //INSERT AMY'S KEYBOARD AND ADD ID AND VALUES - will do later

    //document.ready stuff different from startGame() function? should startGame() not be included in on load page functions? should on load just have each individual function, not contained in startGame()?



var targetScore = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- right range??
//function to instantiate new targetScore??????????????????????

var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

var randomPOS = partsOfSpeechArray[Math.floor(Math.random() * partsOfSpeechArray.length)];

var randomLength = Math.floor(Math.random() * (10-4)) + 4;

var letterValues = {
    "a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2, "h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3, "q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4, "z": 10
}


$(document).ready(function() {

    var winningScore;
    var won;
    var answerArray = [];



///////////////////////////// BUTTON FUNCTIONALITY ////////////////////////////////

    $(".btn-link").on("click", function() { //fill in the blanks
        var letterGuessed = $(this).val(); 
        var index = answerArray.indexOf("_ "); //find first blank in array
        if (index !== -1) {
            answerArray[index] = letterGuessed; //...and replace with letter
        }
        answerArray.join(" ");
        $("#answerSpace").html(answerArray);
    });


    $("#clear").on("click", function() {
        function newBlanks() {
            var length = answerArray.length;
            $("#answerSpace").empty();
            for (var t=0; t<length; t++) {
                answerArray.splice(t, 1, "_ ");
            }
            $("#answerSpace").html(answerArray);
        }
        newBlanks();
    });


    $("#submit").on("click", function() {
        stop();
        checkIfWon();
        //console.log(answerArray)
    });


    $("#yes-lost").on("click", function() {
        location.reload();
    });


    $("#no-lost").on("click", function() {
        $("#thanksForPlaying").modal();
    });


    $("#yes-won").on("click", function() { // need to test this!!!!!!!!!!
        //////////go to next round
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
        return won;
    };


    function win() {
        stop();
        $.ajax({
            method: "POST",
            url: "/api/scores",
            //data: //new leaderboard data
        }).then(function(results) {        
            console.log(results);
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
            return won;
        } else {
            var x = Object.keys(letterValues); //list of all letters
            console.log(x)
            //check to make sure the value of user's word matches the target score
            var scoreArray = [];
            //console.log(answerArray.length) //ok
            for (var a=0; a<answerArray.length; a++) { //for each letter in user's answer...
                if (x.indexOf(answerArray[a]) > -1) { //if letter appears in array...
                    var letterScore = letterValues[answerArray[a]];
                    scoreArray.push(letterScore);
                    console.log(answerArray[a])
                }
            }
            var sum = 0;
            for (var b=0; b<scoreArray.length; b++) { 
                sum += scoreArray[b]; //doesn't always grab all the letters!!!?????
                console.log(sum)
            };
            console.log("total sum: " + sum) //GRABS MULTIPLE TOTAL SUMS, BUT SHOULD ONLY GIVE ONE!!!!
            if (sum === targetScore) {
                console.log("matching target score");
//////////////////////////////////////////////////////////////////////////////////////////////////
                        //query db to make sure user's word is found in the dictionary
                        $.ajax({
                            method: GET,
                            url: "/api/all"
                        }).then (function(results) {

                        
                        "/api/all", function(results) { //////////////
                            console.log(results);
                            console.log(results[0].word);
                            if (results.indexOf(guessedWord) >= 0) { //if guessed word is found in dictionary...
                                console.log(results.indexOf(guessedWord));
                                var position = (results.indexOf(guessedWord)); //?????
                                console.log(position);
                                //if part of speech matches randomly generated one...
                                if (randomPOS == results.position.wordtype) { //not sure about this part
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
                        }
                        })

                    } else {
                        loss();
                        console.log(won); //looping through to here multiple times (sum never = target score)
                        return won;
                    }
                           
                //} 
                //else { ////////////////////////////// 
                    //loss();
                    //console.log(won); //ok
                    //return won;
                //}
            //}
            var guessedWord = answerArray.join("");
            //console.log(guessedWord) //ok
        } 
                                    
                    return won;
                    console.log(won); /////
              
    }

/////////////////////////////////////////////////////////////////////////////////////////////////

    function startGame() {

        //randomLength(); //
        //randomPOS();
        $("#POS").text(randomPOS);
        //$("#length").text(randomPOS);
        //need to calculate target score!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! new instance of function????
        //targetScore(); //generate random score -- right range??         
        $("#score").text("Target score: " + targetScore);
        run();

        function generateBlanks() {
            answerArray = [];
            $("#answerSpace").empty();
            for (var t=0; t<randomLength; t++) {
                answerArray.push("_ ");
            }
            $("#answerSpace").html(answerArray);
            return answerArray;
            //console.log("answer array length is " + answerArray.length) //ok
        }
    
        //console.log(targetScore); //ok
        generateBlanks();

        console.log(won); //undefined
        //return targetScore, won;

    }


///////////////////////////////////// CALLING FUNCTIONS ////////////////////////////////////////////
    
    //on load...
    startGame(); //should I really be calling this on load, or just on new game????????????????

    console.log(won); // UNDEFINED -- need to get it recognize true or false at this level

    if (won === true) {
        winningScore += secondsLeft * 10; //carry over score to next round
        console.log("Nice work! You earned " + winningScore + " points.");
        //startGame(); //?????????????????????????????????
    }

    else if (won === false) {
        winningScore = 0;
        //startGame(); //????????????????????????????????
    }


});