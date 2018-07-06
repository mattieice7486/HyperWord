// NEXT STEPS:
    //NEED TO WORK ON GETTING STARTGAME TO RETURN WIN OR LOSS    
    //INSERT AMY'S KEYBOARD AND ADD ID AND VALUES
    //FIGURE OUT HOW TO QUERY DICTIONARY DB AND PUSH TO LEADERBOARD FROM HERE!!!!!
    



$(document).ready(function() {

    var winningScore;
    var won;

    var letterValues = {
        "a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2, "h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3, "q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4, "z": 10
    }

    var partsOfSpeechArray = ["noun", "adjective", "verb", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

    var answerArray = [];



///////////////////////////// BUTTON FUNCTIONALITY ////////////////////////////////

    $("#letter").on("click", function() { //fill in the blanks
        //console.log("letter works") //ok
        var letterGuessed = $("#letter").val(); //add "letter" ID and letter values (e.g. "A") to Amy's HTML!!!!
        var index = answerArray.indexOf("_ "); //find first blank in array
        if (index !== -1) {
            answerArray[index] = letterGuessed; //...and replace with letter
        }
        //answerArray.push(letterGuessed);
        console.log(answerArray);
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
            console.log(answerArray);
            $("#answerSpace").html(answerArray);
            //console.log("answer array length is " + answerArray.length) //ok
        }
        newBlanks();
    });


    $("#submit").on("click", function() {
        //console.log("submit works") //ok
        stop();
        checkIfWon();
        console.log(answerArray)
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
        console.log(won) //////////////////////////////////////?????????????
    };


    function win() {
        stop();
        $.ajax({
            type: "POST",
            url: "/api/leaderboard"
            //data: guessedWord //pass data through this variable
        }).then(function(data) {
        
            console.log(data);
            $("#winModal").modal(); //modal with option to proceed to next round
            
            return {
                winningScore: winningScore + secondsLeft * 10,
                won: true
            };
            console.log(winningScore)
            console.log(won) //////////////////////////////////////?????????????
        });
    };


//////////////////////////////////// DETERMINE WIN OR LOSS ///////////////////////////////////////

    function checkIfWon() {

        //check to make sure all blanks were filled in
        if (answerArray.indexOf("_ ") > -1) {
            loss();
            //console.log("blanks remaining") //ok
        } else {
            //console.log("no blanks left") //ok

            //check to make sure the value of user's word matches the target score 
            var scoreArray = [];
            for (var a=0; a<answerArray.length; a++) {
                //console.log(answerArray[a]);
                if (answerArray[a] in letterValues) {
                    //console.log("found letter in letterValues object")
                    var letterScore = letterValues.answerArray[a]; //grab value of each letter
                    scoreArray.push(letterScore); //push to array
                    var sum;
                    for (var b=0; b<scoreArray.length; b++) {
                        sum += scoreArray[b]; //calculate total value
                    };
                    return sum;
                    console.log(sum);

                    //if word's value matches target value...
                    if (sum === targetScore) {
                        console.log("matching target score");

                    //query db to make sure user's word is found in the dictionary
                        $.ajax({
                            type: "GET",
                            url: "/api/entries"
                            //data: guessedWord //pass data through this variable
                        }).then(function(data) {
                            console.log(data.word[0]);
                            console.log(data.word.wordtype[0]);
                            if (results.indexOf(guessedWord) >= 0) { //if guessed word is found in dictionary... {
                                console.log(results.indexOf(guessedWord));
                                var position = (results.indexOf(guessedWord));
                                //if part of speech of that matching word from dictionary matches randomly generated one...
                                if (randomPOS == results.position.wordtype) { //not sure about this
                                    win();
                                } else {
                                    loss();
                                }
                            } else {
                                loss();
                            }
                    });
                    }
                           
                    } else { 
                        loss();
                    }
                    }
                    var guessedWord = answerArray.join("");
                    console.log(guessedWord) //ok
                    } 
                                    
                    return won;       //?????????????????????????????????????????????????
                    console.log(won);                                
              
    }

/////////////////////////////////////////////////////////////////////////////////////////////////

    function startGame() {

        var randomPOS = partsOfSpeechArray[Math.floor(Math.random() * partsOfSpeechArray.length)];
        console.log(randomPOS);

        var randomLength = Math.floor(Math.random() * (10-4)) + 4; //generate random word length
        console.log("random length is " + randomLength); //ok

        var targetScore = Math.floor(Math.random() * (30 - 7)) + 7; //generate random score -- right range??

        run();

        function generateBlanks() {
            answerArray = [];
            $("#answerSpace").empty();
            for (t=0; t<randomLength; t++) {
                answerArray.push("_ ");
            }
            $("#answerSpace").html(answerArray);
            return answerArray;
            //console.log("answer array length is " + answerArray.length) //ok
        }
    
        //console.log(targetScore); //ok
        generateBlanks();
        //return won; //HOW DOES IT KNOW WHETHER THEY WON OR LOST???????????????????????
        //console.log(won);

    }


///////////////////////////////////// CALLING FUNCTIONS ////////////////////////////////////////////
    
    //on load...
    startGame();

    console.log(won); // UNDEFINED

    if (won === true) {
        winningScore += secondsLeft * 10; //carry over score to next round
        console.log(winningScore);
        console.log("won");
        startGame();
    }

    else if (won === false) {
        winningScore = 0;
        startGame(); //restart game
        console.log("lost")
    }


});