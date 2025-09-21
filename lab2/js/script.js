//alert("running external JS code!")
//Global variables
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   //reset attempts 
   attempts = 0; 
   document.querySelector("#attempts").textContent = "Attempts Left: " + (7 - attempts);
   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing Guess button
   document.querySelector("#guessBtn").style.display = "inline";
  
   //adding focus to textbox
   let playerGuess = document.querySelector("#playerGuess")
   playerGuess.focus();
   playerGuess.value = "";

   let feedback = document.querySelector("#feedback");

   //clearing guesses
   document.querySelector("#guesses").textContent = "";

   //wins and losses
   document.querySelector("#wins").textContent = "Wins: " + wins;
   document.querySelector("#losses").textContent = "Losses: " + losses;
   
   feedback.textContent = "";

}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess " + guess);
    if(guess < 1 || guess > 99) { 
        let feedback = document.querySelector("#feedback");
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    } else {
        feedback.textContent = "";
    }
    attempts++;
    document.querySelector("#attempts").textContent = "Attempts Left: " + (7 - attempts);
    feedback.style.color = "orange";
    if(guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7 ) {
            feedback.textContent = "Sorry, you lost!, The number was: " + randomNumber;
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = " Guess was low";        }
    }
}

function gameOver() { 
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}