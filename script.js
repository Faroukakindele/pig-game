'use strict';
// selecting elements
const player1Name = document.getElementById('name--0');
const player2Name = document.getElementById('name--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const ply1ScrBox = document.getElementById('current--0');
const ply2ScrBox = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentBox = document.getElementsByClassName('current');
// starting conditon
let scores = [0, 0];
score0.textContent = 0;
score1.textContent = 0;
diceElement.classList.add('hidden');
let scorekeeper = 0;
let activeplayer = 0;

// All function calls
function displayAllButtons() {
  currentBox[0].classList.remove('hidden');
  currentBox[1].classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
}
function removeAllButtons() {
  currentBox[0].classList.add('hidden');
  currentBox[1].classList.add('hidden');
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
}
function resetAllValues() {
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  player1Name.textContent = 'Player 1';
  player2Name.textContent = 'Player 2';
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  diceElement.classList.add('hidden');
  scorekeeper = 0;
  activeplayer = 0;
}
function toggleActivePlayer() {
  activeplayer = activeplayer === 0 ? 1 : 0;
}

function getActivePlayer() {
  return activeplayer;
}

function setScoreKeeper(update) {
  scorekeeper += update;
}

function resetScoreKeeper() {
  scorekeeper = 0;
}

function getScoreKeeper() {
  return scorekeeper;
}

function setScores() {
  scores[getActivePlayer()] += getScoreKeeper();
  resetScoreKeeper();
  return scores[getActivePlayer()];
}
function resetGame() {
  displayAllButtons();
  resetAllValues();
}

//  display all button to start game
displayAllButtons();

// dice rolling functionality
btnRoll.addEventListener('click', function (e) {
  //generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //   display dice and all buttons
  diceElement.src = `dice-${dice}.png`;
  diceElement.classList.remove('hidden');
  //   checking for the value of the dice
  if (dice !== 1) {
    // Adding dice to the current score
    setScoreKeeper(dice);
    document.getElementById(`current--${activeplayer}`).textContent =
      scorekeeper;
  } else {
    /**
     * if the value ==1
     * reset the current box to Zero
     * toggleactive player
     * reset the score keeper
     * change to active playing background color
     */
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    toggleActivePlayer();
    resetScoreKeeper();
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
  }
});

btnHold.addEventListener('click', function (e) {
  //1. Add current scored to  active player's score
  setScores();
  //2 update the value of the scores to the upper part
  document.getElementById(`score--${activeplayer}`).textContent = setScores();
  // reset the current player text-content to 0
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  // if active player score >=100
  if (setScores() >= 100) {
    // active player wins
    document.getElementById(
      `name--${getActivePlayer()}`
    ).textContent = `player ${getActivePlayer() + 1} wins`;
    // remove all buttons when game is over
    removeAllButtons();
    //  change the background color to show the game is finally ended
    document
      .getElementsByClassName(`player--${getActivePlayer()}`)[0]
      .classList.add('player--winner');
  } else {
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
  }
  //  hide the dice when the buttons is held
  diceElement.classList.add('hidden');
  // toggle active player
  toggleActivePlayer();
});

btnNew.addEventListener('click', resetGame);
