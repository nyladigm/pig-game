/*
Title: The Pig Game (adapted from The Complete JavaScript Course 2019 via udemy.com)
Note: I added my own comments to try to make it easier to understand for someone
      that is just learning how to code. 

Rules of the game:

- The game has two players, playing in rounds
- Each player rolls a dice. Player can continue to roll unless they roll a one, in which case the player loses their turn
  as well as the sum of the rolls they accumulated during that turn.
- The objective is to roll as many times and hit 'Hold' to capture that score each round without rolling a one.
- The first player to reach 100 points on GLOBAL score wins the game
*/

// define the global variables
var scores, roundScore, activePlayer, gamePlaying;

// reset the scores and settings to start a game
init();

// click the roll dice button and accumulate points (displayed in the 'current' box) unless the player rolls a one
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // generate a random number between one and six
    var dice = Math.floor(Math.random() * 6) + 1;

    // display the result of the random number
    var diceDOM =  document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // update the players score for the round but only if they have not rolled a one
    if (dice !== 1) {
      // add current score to the score for the players round
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // if the player rolls a one then it's the next players turn
        nextPlayer();
    }
  }
});

// click the hold button to save your accumulated points for the round
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // add current score to the players score for the round
    scores[activePlayer] += roundScore;

    // update the score for the active player
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if current player won the game by checking if they have 100 or more points
    if (scores[activePlayer] >= 100) {
      // when the current player wins game a winner line is displayed, the dice disappears
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // if the players score is less than 100 the game continues and it's the next players turn
      nextPlayer();
    }
  }
});

// change to the non-active player to start their turn
function nextPlayer() {

  // ternary operator in place of an if/else statement
  // when the current player rolls a one, their score for the round is zero
  // and it's now the next players turn
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}

// use the init function to reset the UI when clicking 'new game'
document.querySelector('.btn-new').addEventListener('click', init);

// initialize the game, set the player and current scores to zero, start the game with player 1
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // disable the dice display, set all scores to zero, restore the starting player names
  // remove any winner notifications, reset player 1 to active to start the game
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
