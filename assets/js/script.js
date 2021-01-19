
var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var startTitle = document.querySelector("h3");
var questionBlock = document.getElementById("question");

var timer;
var timerCount;
var complete = false;


// Question array of objects
var questionArray = [
    { question: "", possibleAnswers: ["", "", "", ""], correct: "" },
    { question: "", possibleAnswers: [], correct: "" },
    { question: "", possibleAnswers: [], correct: "" },
    { question: "", possibleAnswers: [], correct: "" }];


// The startGame function is called when the start button is clicked
function startGame() {
    timerCount = 75;
    startTimer();
    startTitle.textContent = "";
    quizRun();
}

function quizRun() {
    for (i = 0; i < questionArray.length; i++) {
        
    }
}

// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = ("Timer: "+timerCount);
        if (timerCount >= 0) {
            if (complete === true && timerCount > 0) {
                clearInterval(timer);
                endGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}


// add click event for start button
startButton.addEventListener("click", startGame);

// Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
    // Resets win and loss counts
    winCounter = 0;
    loseCounter = 0;
    // Renders win and loss counts and sets them into client storage
    setWins()
    setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
