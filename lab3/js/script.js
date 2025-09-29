let submitButton = document.querySelector("#submit");
let a1Message = document.querySelector("#a1-results");
let a2Message = document.querySelector("#a2-results");
let a3Message = document.querySelector("#a3-results");
let a4Message = document.querySelector("#a4-results");
let a5Message = document.querySelector("#a5-results")
let showScore = document.querySelector("#score");
let showTimesTaken = document.querySelector("#timesTaken")
let timesTaken = localStorage.getItem("timesTaken");

if(!timesTaken) {
    timesTaken = 0;
}
showTimesTaken.textContent = "Times taken: " + timesTaken;

submitButton.addEventListener("click", function() {
    let score = 0;
    let answer1 = document.querySelector("#a1").value;
    if (answer1.toLowerCase() === "san francisco") {
        a1Message.textContent = "✅" 
        score += 20;
    } else {
        a1Message.textContent = "❌"
    }

    let answer2Elem = document.querySelector("input[name=cities]:checked");
    let answer2 = answer2Elem ? answer2Elem.value : null;
    console.log(answer2);
    if(answer2 === "sc") {
        a2Message.textContent = "✅"
        score += 20;
    } else {
        a2Message.textContent = "❌"
    }
    

    let answer3 = document.querySelectorAll("input[name=players]:checked");
    let selectedValues = [];
    answer3.forEach(input => {
        if (input.checked) {
            selectedValues.push(input.value);
        }
    });

    if(selectedValues.includes("bp") & selectedValues.includes("mj")) {
        a3Message.textContent = "✅";
        score += 20;
    } else {
        a3Message.textContent = "❌";
    }
    console.log(selectedValues);

    let answer4Elem = document.querySelector("input[name='superbowls']:checked");
    let answer4 = answer4Elem ? answer4Elem.value : null;
    if(answer4 == "5") {
        a4Message.textContent = "✅";
        score +=20;
    } else {
        a4Message.textContent = "❌";
    }

    let answer5 = document.querySelector("input[name='coach']:checked")
    console.log("ANSWER 5: " + answer5)
    if(answer5 && answer5.value == "shanahan") {
        a5Message.textContent = "✅";
        score +=20;
    } else {
        a5Message.textContent = "❌";
    }
    
    showScore.textContent = "Score: " + score + "/100";

    timesTaken++;
    localStorage.setItem("timesTaken", timesTaken);
    showTimesTaken.textContent = "Times taken: " + timesTaken;

    if(score > 80) {
        alert("Congratulations you are a true 49ers fan!");
    }
});

