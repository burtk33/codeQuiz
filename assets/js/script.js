
var timerElement = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var startTitle = document.querySelector("h3");
var questionBlock = document.querySelector("#question");
var answerButtons = document.querySelector("#answer-buttons")

var timer;
var timerCount;
var complete = false;
var questionCount = 0;


// Question array of objects
var questionArray = [
    { question: "question 1", possibleAnswers: ["incorrect", "incorrect", "incorrect", "correct"], correct: "correct" },
    { question: "question 2", possibleAnswers: [], correct: "" },
    { question: "question 3", possibleAnswers: [], correct: "" },
    { question: "question 4", possibleAnswers: [], correct: "" }];


// The startGame function is called when the start button is clicked
function startGame() {
    timerCount = 75;
    startTimer();
    startTitle.textContent = "";
    renderQuestion();
}


function renderQuestion() {
    var q = questionArray[questionCount];
    questionBlock.innerHTML = q.question;
    for (i = 0; i < 4; i++) {
        var newButton = document.createElement("button");
        newButton.setAttribute("class", "btn btn-primary");
        newButton.setAttribute("type", "button");
        newButton.addEventListener("click", checkAnswer);
        newButton.innerHTML = q.possibleAnswers[i];
        answerButtons.appendChild(newButton);
    }
};

//answerButtons.addEventListener("click", checkAnswer);

function checkAnswer(){
    var buttonClicked = this.textContent;
    console.log(buttonClicked);
}


// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = ("Timer: " + timerCount);
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