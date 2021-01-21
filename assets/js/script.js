
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
var userScoreArray=[];



// Question array of objects
var questionArray = [
    { question: "Commonly used data types do not include?", possibleAnswers: ["strings", "booleans", "integers", "alerts"], correct: "alerts" },
    { question: "The condition in an if statement is surround by?", possibleAnswers: ["parentheses", "curly brackets", "quotes", "block brackets"], correct: "parentheses" },
    { question: "Arrays in Javascript can be used to store?", possibleAnswers: ["booleans", "strings", "objects", "all of the above"], correct: "all of the above" },
    { question: "String values must be enclosed with ________ when being assigned to variable.", possibleAnswers: ["parentheses", "quotations", "curly brackets", "commas"], correct: "quotations" }];



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

//dynamicall creat the answer choice buttons
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

//display the question
function renderQuestion() {
    var q = questionArray[questionCount];
    questionBlock.textContent = q.question;
    for (i = 0; i < q.possibleAnswers.length; i++) {
        var buttonRender = document.getElementById(i);
        buttonRender.textContent = q.possibleAnswers[i];
    }

};

//check the users answers
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

//function to run when game ends
//prompts user to inut their initials for the scoreboard
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

//display the scoreboard
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
    resetBtn.setAttribute("type", "button");
    resetBtn.textContent="Reset";
    resetBtn.addEventListener("click", resetPage);
    selectionMsg.appendChild(resetBtn);

}

//submit the score to localStorage
function submitScore() {
    var user = document.querySelector("#initials");
    var userInitials = user.value;
    var userScore=score+" "+userInitials;
    userScoreArray.push(userScore);
    window.localStorage.setItem("user", JSON.stringify(userScoreArray));
    console.log(userInitials);
    viewScores();
}

function resetPage(){
    location.reload();S
}

// add click event for start button
startButton.addEventListener("click", startGame);

//add click event for viewing high scores
highscores.addEventListener("click", viewScores);