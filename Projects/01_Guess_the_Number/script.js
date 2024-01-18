'use strict';

//secretNumber is the number to be guessed
let secretNumber = Math.trunc(Math.random() * 20) + 1;
//Current score in the game
let score = 20;
let highScore = 0;

//DRY functions
const displayMessage = (message) => {
    document.querySelector(".message").textContent = message;
}

/*
    Check Button : 
    - Compares the guess with the required number
    - Handles empty input condition
*/
document.querySelector(".check").addEventListener("click", function()
{
    const guess = Number(document.querySelector(".guess").value);

    //empty input or no number
    if(!guess){
        displayMessage("🙄 No number !");
    }
    else if(guess === secretNumber){ //Correct answer 
        displayMessage("🥳 Correct Number");
        document.querySelector("body").style.backgroundColor = "rgb(48, 214, 48)";
        document.querySelector(".number").style.width = "30rem";
        document.querySelector(".number").textContent = secretNumber;
        if(score > highScore){
            highScore = score;
            document.querySelector(".highscore").textContent = score;
        }
    }
    else if(guess !== secretNumber){ //Higher and lower guesses
        if(score > 1){
            displayMessage((guess > secretNumber) ? "📈 Too High" : "📉 Too Low");
            score--;
            document.querySelector(".score").textContent = score; 
        }
        else{
            score = 0;
            document.querySelector(".score").textContent = score;
            displayMessage("😵 Lost the game");
            document.querySelector("body").style.backgroundColor = "rgb(246, 20, 20)"
        }
    }
});



/*
    Again button : 
    - Resets to initial state of the game
    - Must update the high score
*/
document.querySelector(".again").addEventListener("click", function(){
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    displayMessage("Start guessing...");
    score = 20;
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
});