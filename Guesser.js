/*
GAME FUNCTION
- player must guess a number between a min and max
- player gets a certain amount of guesses
- Notify player of guesses remaining 
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game values 
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessbtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector ('#guess-input'),
      message = document.querySelector ('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
guessbtn.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessbtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter a number between ${minNum} and ${maxNum}`, 'red');
    }

    // Check if won
    if(guess === winningNum) {
     // Game over - won
     
     gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
      // Wrong number
      guessesLeft -=1;

      if(guessesLeft === 0) {
        // Game over - lost

        // Disable input
        guessInput.disabled = true;
        // guessbtn.disabled = true;
        // Change border color 
        guessInput.style.borderColor = 'red';
        // Set message
        setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red');

          // Play Again?
          guessbtn.value = 'Play Again';
          guessbtn.className += 'play-again';
          guessbtn.style.background = 'blue';

      } else {
        // Game continues - answer wrong

        //Change bordercolor
        guessInput.style.borderColor = 'red';


        //Clear the input
        guessInput.value ='';
        setMessage(`Guess is not correct, ${guessesLeft} guesses left.`, 'red');
      }
 
    }
});

//Game over 
function gameOver(won, msg) {
let color;
won === true ? color = 'green' : color = 'red'

  // Disable input
  guessInput.disabled = true;
  // Change Border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Let user know they won
  setMessage(msg);

  // Play Again?
  guessbtn.value = 'Play Again';
  guessbtn.className += 'play-again';
  guessbtn.style.background = 'blue';
  guessbtn.style.innerText = 'white';
}

// Get Random Num
  function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

// Set message
function setMessage (msg, color) {
    message.style.color = color;
    message.textContent = msg;
}





