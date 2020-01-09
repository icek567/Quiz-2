
var testEl = document.getElementById("begintest")
var timerEl = document.getElementById("timer")
var feedbackEl = document.getElementById("feedback")
var beginButton = document.getElementById("begin")
var highScoresLink = document.getElementById("highscores")
var time = 120
var questionNumber = 0
var finalScore = 0
var highScoresArray = []
if (localStorage.getItem("highscores") !== null) {
    highScoresArray = JSON.parse(localStorage.getItem("highscores"))
}

//An array of cool questions
var questionArray = [
    {
        title: "Which hero is in Gotham City?",
        choices: ["Superman", "Vitto", "Flash", "Batman"],
        answer: "Batman"
    },
    {
        title: "Which hero is in Central City?",
        choices: ["Reverse Flash", "Iron Man", "Flash", "Russell"],
        answer: "Flash"
    },
    {
        title: "What is Superman's Weakness?",
        choices: ["Bullets", "Kryptonite", "The Flu", "Coding"],
        answer: "Kryptonite"
    },
    {
        title: "What is Batman's superpower?",
        choices: ["Driving", "Brooding", "Money", "Super Strength"],
        answer: "Money"
    },
    {
        title: "What Villain broke Batman?",
        choices: ["Bane", "Joker", "Scarecrow", "Javascript"],
        answer: "Bane"
    },
    {
        title: "What Villain was able to defeat Superman?",
        choices: ["Lex Luthor", "Doomsday", "Toy Man", "Yan"],
        answer: "Philip II"
    },
    {
        title: "What is Spider-Man's Moral Quote?",
        choices: ["Here I come", "For the Greater Good", "With great power comes great resposibility", "T be or not to be"],
        answer: "With great power comes great resposibility"
    },
    {
        title: "What Newspaper company does Peter Parker work for?",
        choices: ["WallSreet Journal", "Chicago Tribune", "The New York Times", "The Daily Bugle"],
        answer: "The Daily Bugle"
    },
    {
        title: "Who leads the X-Men?",
        choices: ["Cyclops", "Professor X", "Wolverine", "Rogue"],
        answer: "Professor X"
    },
    {
        title: "Which member of the X-Men has Adamantium bones?",
        choices: ["Jean Grey", "Beast", "Wolverine", "Cyclops"],
        answer: "Wolverine"
    },
    {
        title: "Where is Wolverine from?",
        choices: ["Canada", "Mexico", "United States", "Brazil"],
        answer: "Canada"
    },
    {
        title: "Which is the magic word used by Billt Batson to transform?",
        choices: ["Shazam", "Power Up", "Let's go", "Ready or not here I come"],
        answer: "Shazam"
    },
    {
        title: "What is the name of the Wizard turned evil that fights Shazam?",
        choices: ["The Rock", "Kratos", "Black Atom", "Hercules"],
        answer: "Black Atom"
    },
    {
        title: "Iron Man's alter ego?",
        choices: ["Tony Stark", "Bruce Wayne", "Clark Kent", "Peter Parker"],
        answer: "Tony Stark"
    },
    {
        title: "What is the name of Iron Man's sidekick?",
        choices: ["Bucky", "Robin", "War Machine", "Wally West"],
        answer: "What's updog?"
    },
    {
        title: "Who is Batman's greatest arch enemy?",
        choices: ["Superman", "Joker", "Mr. Freeze", "Sinistro"],
        answer: "Joker"
    },
  ];

//Link to the high scores
highScoresLink.addEventListener("click", function() {
    renderScores();
})

//Running the timer and updating the timer text
function beginTimer() {
    var interval = setInterval(function() {
        //If all questions are finished
        if (questionNumber === questionArray.length) {
            clearInterval(interval);
        }
        //If time runs out
        if (time === 0) {
            timerEl.textContent = "Time: " + time;
            clearInterval(interval);
            alert("Time's up!");
            endTest();
        }
        //Decrement time and update timer
        else {
            time--;
            timerEl.textContent = "Time: " + time;
        }
    }, 1000)
    ///Timer needs to stop with highscoreslink
    highScoresLink.addEventListener("click", function() {
        clearInterval(interval);
        time = 0;
        timerEl.textContent = "Time: " + time;
    })
}

//Renders the test
function render(x) {
    //Clear the test space
    testEl.innerHTML = "";
    //Create question
    var question = document.createElement("div");
    question.textContent = (questionArray[x].title);
    testEl.appendChild(question);
    //Create answer buttons
    var answersArray = questionArray[x].choices
    for (i of answersArray) {
        var answerButton = document.createElement("button");
        answerButton.textContent = i;
        answerButton.setAttribute("class", "btn btn-dark");
        testEl.appendChild(answerButton);
        var space = document.createElement("br");
        testEl.appendChild(space);
    }

}

//Test ends, user submits score
function endTest() {
    //When time is up or the last question is answered
    finalScore = time;
    timerEl.textContent = "Time: " + time;
    testEl.textContent = "Your final score is: " + finalScore;

    var space = document.createElement("br");
    testEl.appendChild(space);

    var form = document.createElement("form");
    form.textContent = "Please enter your initials";
    testEl.appendChild(form);

    var initials = document.createElement("input");
    form.appendChild(initials);
    
    var submit = document.createElement("button");
    submit.textContent = "Submit";
    form.appendChild(submit);

    feedbackEl.textContent = "";
}

//Button event listeners
testEl.addEventListener("click", function() {

    if (event.target.tagName === "BUTTON") {
        //Begin Button
        if (event.target.textContent === "Begin!" || event.target.textContent === "Take the quiz again!") {
            questionNumber = 0;
            time = 120;
            beginTimer();
            render(questionNumber);
        }
        //Clear button
        else if (event.target.textContent === "Clear highscores") {
            highScoresArray = [];
            localStorage.setItem("highscores", JSON.stringify(highScoresArray));
            renderScores();
        }

        //Home Button
        else if (event.target.textContent === "Main page") {
            renderHome();
        }

        //Submitting scores at the end of a test
        else if (event.target.textContent === "Submit") {
            highScoresArray.push({initials: document.querySelector("input").value, score: finalScore});
            localStorage.setItem("highscores", JSON.stringify(highScoresArray));
            renderScores();
        }

        //Answer buttons
        else {
            var clickedAnswer = event.target.textContent;
            var correctAnswer = questionArray[questionNumber].answer   ;     
            if (clickedAnswer === correctAnswer) {
                feedbackEl.textContent = "Correct!";
                feedbackEl.setAttribute("style", "color: green");
            }
            else {
                feedbackEl.textContent = "Wrong!";
                feedbackEl.setAttribute("style", "color: red");
                //Deducting time for a wrong answer
                if (time > 15) {
                    time = time - 15;
                    timerEl.textContent = "Time: " + time;
                }
                else {
                    time = 0;
                    timerEl.textContent = "Time: " + time;
                }
            }
            //Increment questionNumber and render next question
            questionNumber++
            if (questionNumber === questionArray.length) {
                endTest();
            }
            else {
            render(questionNumber);
            }
        }
    }
})

//Render the High Scores page
function renderScores() {
    testEl.textContent = "";
    feedbackEl.textContent = "";

    //List of High Scores
    highScoresArray = JSON.parse(localStorage.getItem("highscores"));
    for (i of highScoresArray) {
        var newScore = document.createElement("div");
        newScore.textContent = i.initials + ":   " + i.score;
        testEl.appendChild(newScore);
    }

    var returnButton = document.createElement("button");
    returnButton.textContent = "Take the quiz again!";
    returnButton.setAttribute("class", "btn btn-dark");
    testEl.appendChild(returnButton);

    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear highscores";
    clearButton.setAttribute("class", "btn btn-dark");
    testEl.appendChild(clearButton);

    var homeButton = document.createElement("button");
    homeButton.textContent = "Main page";
    homeButton.setAttribute("class", "btn btn-dark");
    testEl.appendChild(homeButton);
}

//Return to main page from high scores
function renderHome() {
    testEl.textContent = "";
    var testTitle = document.createElement("div");
    testTitle.textContent = "The Super Hero Quiz";
    testTitle.setAttribute("id", "title");
    testEl.appendChild(testTitle);

    var beginText = document.createElement("p");
    beginText.textContent = "Press the button to begin!";
    testEl.appendChild(beginText);

    var beginButton = document.createElement("button");
    beginButton.textContent = "Begin!";
    beginButton.setAttribute("class", "btn btn-dark");
    beginButton.setAttribute("id", "button");
    testEl.appendChild(beginButton);
}