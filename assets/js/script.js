
var timerElement = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var startTitle = document.querySelector("h3");
var questionBlock = document.querySelector("#question");
var answerButtons = document.querySelector("#answer-buttons");
var selectionMsg = document.querySelector("#alert-msg");
var highscores = document.querySelector("#high-score");
var submitForm = document.createElement("input");
var submitBtn = document.createElement("button");
var resetBtn = document.createElement("button");
var clearBtn = document.createElement("button");

var timer;
var timerCount;
var complete = false;
var questionCount = 0;
var score = 0;
var quizRunning = false;
var startRunning = true;



// Question array of objects
var questionArray = [
    { question: "question 1", possibleAnswers: ["incorrect", "incorrect", "incorrect", "correct"], correct: "correct" },
    { question: "question 2", possibleAnswers: ["correct", "incorrect", "incorrect", "incorrect"], correct: "correct" },
    { question: "question 3", possibleAnswers: ["incorrect", "incorrect", "correct", "incorrect"], correct: "correct" },
    { question: "question 4", possibleAnswers: ["incorrect", "correct", "incorrect", "incorrect"], correct: "correct" }];



// The startGame function is called when the start button is clicked
function startGame() {
    startRunning = false;
    quizRunning = true;
    timerCount = 75;
    startTimer();
    startTitle.textContent = "";
    createButtons();
    renderQuestion();
    startButton.remove();
}

function createButtons() {
    for (i = 0; i < 4; i++) {
        var newButton = document.createElement("button");
        newButton.setAttribute("class", "btn btn-primary");
        newButton.setAttribute("type", "button");
        newButton.setAttribute("id", i);
        newButton.addEventListener("click", checkAnswer);
        answerButtons.appendChild(newButton);
    }
}


function renderQuestion() {
    var q = questionArray[questionCount];
    questionBlock.textContent = q.question;
    for (i = 0; i < q.possibleAnswers.length; i++) {
        var buttonRender = document.getElementById(i);
        buttonRender.textContent = q.possibleAnswers[i];
    }

};


function checkAnswer() {
    var buttonClicked = this.textContent;
    var q = questionArray[questionCount];
    console.log(buttonClicked);
    if (buttonClicked === q.correct && timerCount > 0) {
        selectionMsg.textContent = "Correct!";
        questionCount++;
        console.log(questionCount);
        if (questionCount < questionArray.length) {
            renderQuestion();
        }
        else {
            endGame();
        }

    }
    else {
        selectionMsg.textContent = "Incorrect!";
        timerCount -= 10;
    }
};


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
        if (timerCount <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    score = timerCount;
    complete = true;
    quizRunning = false;
    answerButtons.remove();
    startTitle.textContent = "Quiz Complete!";
    questionBlock.textContent = "Your score is " + score + ". Please enter your initials";
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("class", "btn btn-primary");
    submitBtn.setAttribute("type", "button");
    submitBtn.addEventListener("click", submitScore);
    submitForm.setAttribute("class", "form-control");
    submitForm.setAttribute("type", "text");
    submitForm.setAttribute("id", "initials");
    selectionMsg.appendChild(submitForm);
    selectionMsg.appendChild(submitBtn);
}

function viewScores() {

    startTitle.textContent = " Highscores";
    questionBlock.textContent = "";
    selectionMsg.textContent = "";
    if (startRunning === true) {
        startButton.remove();
    }
    if (quizRunning === true) {
        answerButtons.remove();
    }
    if (complete === true) {
        submitForm.remove();
        submitBtn.remove();
    }
    var textFill = JSON.parse(window.localStorage.getItem("user"));
    questionBlock.textContent = textFill;
    resetBtn.setAttribute("class", "btn btn-primary");
    clearBtn.setAttribute("class", "btn btn-primary");
    resetBtn.setAttribute("type", "button");
    clearBtn.setAttribute("type", "button");





}

function submitScore() {
    var user = document.querySelector("#initials");
    var userInitials = user.value;
    window.localStorage.setItem("user", JSON.stringify(score + " " + userInitials));
    console.log(userInitials);
    viewScores();
}


// add click event for start button
startButton.addEventListener("click", startGame);

//add click event for viewing high scores
highscores.addEventListener("click", viewScores);