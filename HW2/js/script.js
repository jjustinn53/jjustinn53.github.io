let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors");
let cpuChoices = ["Rock", "Paper", "Scissors"];
let feedback = document.querySelector("#feedback");
let randomIndex;
let cpu;
let wins = 0;
let losses = 0
let draw = 0;
let choice;
let handAnimation = document.querySelector("#handAnimation");
let playerHandAnimation = document.querySelector("#playerHandAnimation");

rock.addEventListener("click", function() {
    choice = rock.value;
    checkChoice(choice)
})

paper.addEventListener("click", function() {
    choice = paper.value;
    checkChoice(choice)
})

scissors.addEventListener("click", function() {
    choice = scissors.value;
    checkChoice(choice)
})

initializeGame();

document.querySelector("#playAgain").addEventListener("click", function() {
    initializeGame();
    handAnimation.textContent = "";
    playerHandAnimation.textContent = "";
});

function initializeGame() {
    randomIndex = Math.floor(Math.random() * cpuChoices.length);
    cpu = cpuChoices[randomIndex];
    console.log("cpu: " + cpu);

   // hiding the play again button
    document.querySelector("#playAgain").style.display = "none";

   // enable buttons
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;

   // wins and losses
    document.querySelector("#wins").textContent = "Wins: " + wins;
    document.querySelector("#losses").textContent = "Losses: " + losses;
    document.querySelector("#draw").textContent = "Draw: " + draw;
   
    feedback.textContent = "";
}

function checkChoice(choice) {
    playerHandAnimation.textContent = "👊";
    playerHandAnimation.classList.add("animate");

    handAnimation.textContent = "👊";
    handAnimation.classList.add("animate");
    
    setTimeout(function() {
        handAnimation.textContent = cpu === "Rock" ? "👊" : cpu === "Paper" ? "🤚" : "✌️"; 
        playerHandAnimation.textContent = choice === "Rock" ? "👊" : choice === "Paper" ? "🤚" : "✌️"; 

        playerHandAnimation.classList.remove("animate");
        handAnimation.classList.remove("animate");
        
         
        if(choice == "Rock" & cpu == "Scissors" ||
            choice == "Paper" & cpu == "Rock" ||
            choice == "Scissors" & cpu == "Paper"
        ) {
            console.log("You win!");
            feedback.textContent = "Good work! " + choice + " beats " + cpu + "!";
            feedback.style.color = "darkgreen";
            wins++;
        } else if (choice == cpu) {
            console.log("Tie!");
            feedback.textContent = "Draw!";
            feedback.style.color = "lightgreen";
            draw++;
        } else {
            console.log("You lose!");
            feedback.textContent = "Sorry! " + choice + " is beat by " + cpu + "!";
            feedback.style.color = "darkred";
            losses++;
        }
        gameOver();
    }, 1000);
}

function gameOver() {
    document.querySelector("#playAgain").style.display = "inline";

    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
}