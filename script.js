const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What are the ingredients for a margarita?",
        choiceA : "tequila, triplesec, sour, and lime juice",
        choiceB : "tequila, sour, and soda water",
        choiceC : "tequila, sour, lemonjuice, and triple sec",
        correct : "A"
    },{
        question : "How many spirits are in a Long Island Iced Tea?",
        choiceA : "4",
        choiceB : "5",
        choiceC : "3",
        correct : "B"
    },{
        question : "Where did Vodka originate?",
        choiceA : "Switzerland",
        choiceB : "France",
        choiceC : "Finland",
        correct : "C"
    },{
        question : "What are the ingredients in a Old Fashioned?",
        choiceA : "bourbon, simple syrup and bitters",
        choiceB : "bourbon, grand marnier, and bitters",
        choiceC : "bourbon and bitters",
        correct : "A"
    },{
        question : "which of the following is NOT a Vodka?",
        choiceA : "Titos",
        choiceB : "Herrardura",
        choiceC : "Stoli",
        correct : "B"
    },{
        question : "what does IPA stand for?",
        choiceA : "Industrialized Pale Ale",
        choiceB : "Imported Pale Ale",
        choiceC : "Imperial Pale Ale",
        correct : "C"
    },{
        question : "Which one of these is NOT a Tequila?",
        choiceA : "Bacardi",
        choiceB : "Patron",
        choiceC : "Casamigos",
        correct : "A"
    },{
        question : "What is a Cape Codder?",
        choiceA : "Vodka and Grapefruit",
        choiceB : "Vodka and Cranberry",
        choiceC : "Vodka and OJ",
        correct : "B"
    },{
        question: "Where did Rum originate?",
        choiceA : "Jamaica",
        choiceB : "Trinidad",
        choiceC : "Barbados",
        correct : "C"
    }
];

// variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// question selection
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// progress here
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter here

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        
        score++;
        
        answerIsCorrect();
    }else{
        
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate score
    const scorePerCent = Math.round(100 * score/questions.length);

    
    
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

