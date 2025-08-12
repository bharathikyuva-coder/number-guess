document.addEventListener("DOMContentLoaded", function () {
  // Game variables
  let targetNumber = Math.floor(Math.random() * 100) + 1;
  let lives = 5;
  const maxLives = 5;

  // DOM elements
  const guessInput = document.getElementById("num");
  const submitButton = document.getElementById("submit");
  const liveDisplay = document.getElementById("liveNo");
  const messageElement = document.getElementById("message");

  // Initialize game
  liveDisplay.textContent = lives;

  // Submit button click handler
  submitButton.addEventListener("click", checkGuess);

  // Also allow Enter key to submit
  guessInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkGuess();
    }
  });

  function checkGuess() {
    // Get user's guess
    const userGuess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(userGuess)) {
      messageElement.textContent = "Please enter a valid number!";
      messageElement.style.color = "#ff7675";
      return;
    }

    if (userGuess < 1 || userGuess > 100) {
      messageElement.textContent = "Please enter a number between 1-100!";
      messageElement.style.color = "#ff7675";
      return;
    }

    // Check if guess is correct
    if (userGuess === targetNumber) {
      // Player wins
      messageElement.textContent = "Correct! You guessed the number!";
      messageElement.style.color = "#00b894";
      setTimeout(() => {
        window.location.href = `win.html?number=${targetNumber}&attempts=${
          maxLives - lives
        }`;
      }, 1500);
      return;
    }

    // Incorrect guess - decrease lives
    lives--;
    liveDisplay.textContent = lives;

    // Give hint
    if (userGuess < targetNumber) {
      messageElement.textContent = "Too low! Try a higher number.";
    } else {
      messageElement.textContent = "Too high! Try a lower number.";
    }
    messageElement.style.color = "#775413ff";

    // Check if game over
    if (lives <= 0) {
      messageElement.textContent = `Game Over! The number was ${targetNumber}`;
      messageElement.style.color = "#470b94ff";
      setTimeout(() => {
        window.location.href = `lose.html?number=${targetNumber}`;
      }, 1500);
    }

    // Clear input field
    guessInput.value = "";
    guessInput.focus();
  }
});

