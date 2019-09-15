var correctAnswers = 0;
var wrongAnswers = 0;
var questionArray = {
    questions: [{
        question: "What color is the sky?",
        possibleAnswers: ["red", "green", "blue", "orange"],
        id: "question-1",
        answer: [2]
    },
    {
        question: "What color is grass?",
        possibleAnswers: ["purple", "yellow", "green", "pink"],
        id: "question-2",
        answer: [2],
    },
    {
        question: "Is water wet?",
        possibleAnswers: ["yes", "no"],
        id: "question-2",
        answer: [1],
    }


    ]
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        } else if (timer === 0) {
            alert("TIMES UP");

        }
    }, 1000);
}



window.onload = function () {
    var oneMinute = 60,
        display = document.querySelector('#time-remaining');
    startTimer(oneMinute, display);


};

function formTemplate(data) {
        var qString = "<form id='questionOne'>"+ data.question +"<br>";
        var possibleAnswers = data.possibleAnswers;
        for (var i = 0; i < possibleAnswers.length; i++) {
            var possible = possibleAnswers[i];
            qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;
    
        }
        return qString + "</form>";
    }


    window.formTemplate = formTemplate;

function createQuestions(){
var HTMLQuestions = ""
for (i = 0; i < questionArray.questions.length; i++) {
    HTMLQuestions = HTMLQuestions + formTemplate(questionArray.questions[i]);
}
$("#questions").append(HTMLQuestions)
}

createQuestions();





$("#finish").on("click", function () {

})
