'use strict';

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let playing, scores, currentScore, activePlayer;

//DRY functions
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    diceEl.classList.add("hidden");
};

const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}


init();

//Rolling Dice
btnRoll.addEventListener("click", function() {
    if(playing){
        //Random roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //Display the dice 
        diceEl.classList.remove("hidden");
        diceEl.src = `assets/dice-${dice}.png`;
        //If dice not 1
        if(dice !== 1){
            //add to current dice
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            //switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function() {
    if(playing){
        //add current player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //check if score is 100
        if(scores[activePlayer] >= 100){
            //Finish the game
            diceEl.classList.add("hidden");
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }
        else{
            //Switch player
            switchPlayer();
        }
    }
});

//New game button functionality
btnNew.addEventListener("click", init);