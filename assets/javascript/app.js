// initialize the .js document with this. It contains all of the code for the .js file:
$( document ).ready(function() {

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
           var questions = [
            {
                   question: 'WHERE WAS ARNOLD BORN?',
                   possibles: ['GERMANY', 'AUSTRIA', 'AMERICA', 'NORWAY'],
                   id: 'question-one',
                   answer: 1
            }, {
                question: 'WHAT YEAR DID ARNOLD BECOME GOVERNER OF CALIFORNIA?',
                possibles: ['2003', '1999', '2012', '2005', '2002'],
                id: 'question-two',
                answer: 0
            }, {
                question: 'WHAT YEAR DID ARNOLD START ACTING?',
                possibles: ['1971', '1960', '1955', '1998', '1969'],
                id: 'question-three',
                answer: 4
            }, {
                question: 'WHAT WAS ARNOLDS FIRST MOVIE ROLE?',
                possibles: ['TERMINATOR', 'HERCULES IN NEW YORK', 'RUNNING MAN', 'CONAN THE BARBARIAN', 'CONAN THE DESTROYER'],
                id: 'question-four',
                answer: 1
            }, {
                question: 'HOW MANY TIMES HAS ARNOLD WON MR. OLYMPIA?',
                possibles: ['SEVEN', 'FIVE', 'ONE', 'THREE', 'TEN'],
                id: 'question-five',
                answer: 0
            }, {
                question: 'WHAT IS ARNOLDS HIGHEST GROSSING FILM?',
                possibles: ['TERMINATOR', 'TERMINATOR 2', 'KINDERGARDEN COP', 'PREDATOR', 'TWINS'],
                id: 'question-six',
                answer: 1
    
            }, {
                question: 'WHAT IS THE BEST ARNOLD QUOTE OF ALL TIME?',
                possibles: ['DILLON', 'PUT THAT COOKIE DOWN', 'THE ICE AGE!!', 'CROM LAUGHS AT YOUR FOUR WINDS', 'ALL OF THEM YOU IDIOT'],
                id: 'question-seven',
                answer: 4
            }, {
                question: 'HOW OLD IS ARNOLD?',
                possibles: ['50', '80', '72', '45', '87'],
                id: 'question-eight',
                answer: 2
            }, {
                question: 'WHAT YEAR DID ARNOLD IMMIGRATE TO THE US?',
                possibles: ['1982', '2001', '1968', '1986', '2019'],
                id: 'question-nine',
                answer: 2
            }, {
                question: 'HOW MUCH IS ARNOLDS DEADLIFT RECORD?',
                possibles: ['690 LBS', '710 LBS', '500 LBS', '980 LBS', '460 LBS'],
                id: 'question-ten',
                answer: 1
            }, 
    
            ]
    
    
        
        var timeRemaining = 60;
        $('#time-remaining').on('click', run);
    
        // This function enables the timeRemaining of seconds to decrease with time, and to display
        // the result of that decrease until time is up. 
        function decrement(){
            // Decrease timeRemaining by one.
            timeRemaining--;
            // Show the timeRemaining in the #time-remaining div.
            $('#time-remaining').text(timeRemaining + " seconds");
            // When the timeRemaining is equal to zero, 
            if (!timeRemaining){
            // run the stop function.
            stop();
            // Alert the user that time is up. Update the innerHTML of the message
           // div to say 'Game Over!'
            alert('time up!');
            checkAnswers();
            }
        }
        
        // the run function sets the spacing of the decrement function's time interval so that
        // it can be equal to a second per timeRemaining decrement.
        function run(){
            counter = setInterval(decrement, 1000);
        }
        
        // The stop function
        function stop(){
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
            clearInterval(counter);
        }
    
        // Execute the run function.
        run();
    
    // this function dynamically creates the inputs needed for the form and relates them to the
    // items held within the game object 
    function formTemplate(data) {
    // the first variable relates the form field for question with the data in the object for
    // each question so that the questions can be inputed into that form field
        var qString = "<form id='questionOne'>"+ data.question + "<br>" ;
    // this variable to access the question object's possibles array needed to answer each question
        var possibles = data.possibles;
    // a for loop to go through the possibles array for each question to add the values of each possibles
    // array and using qString, add them as radio buttons to the question to which they are
    // associated
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name="+data.id+" value="+ i +">"+possible;
    
        }
        return qString + "</form> <br>";
    }
    window.formTemplate = formTemplate;
    
    // this function takes the template created in the last function and by appending it,
    // allows it to be displayed on the page
    function buildQuestions(){
        var questions2 = questions;
        for (var i = 0; 4 < questions2.length; i++){
        questions2.splice(Math.floor(Math.random()*questions2.length), 1)
        }
        var questionHTML = ''
        for (var i = 0; i<questions2.length; i++) {
            questionHTML = questionHTML + formTemplate(questions2[i]);
        }
        $('#questions').append(questionHTML);
    
    }
    
    // function that 
    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }
    
    // call the buildQuestions function
    buildQuestions();
    
    // function to tabulate the guesser results
    function checkAnswers (){
    
    // variables needed to hold results
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
    
    // for loop iterates through each question and passes the questions at each index first into
    // the isCorrect function to see if they match the indices of correct answers, and if they do,
    // increments up the correct score
        for (var i = 0; i<questions.length; i++) {
            if (isCorrect(questions[i])) {
                correct++;
            } else {
    // then this statement runs the questions at each index through the checkAnswered function
    // to determine whether the user clicked an answer, or did not click an answer, so that
    // incorrect and unAnswered scores can be delineated from each other
                if (checkAnswered(questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }
    // display the results of the function in the results div and use strings of text to relate the
    // results of the for loop with their corresponding values
        $('#results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }
    
    // this function checks whether the guesser actually checked an answer for each of the 
    // questions
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');
    // the for loop creates a condition to check if the buttons were checked and and then sets
    // the anyAnswered variable to true if they were
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
    // then return the anyAnswered variable so it can be tabulated in the last function to distinguish
    // between incorrect answers and those answers that were not attempted
        return anyAnswered;
    
    }
    
    // create a function with an onclick event for the doneButton that both checks the Answers 
    // and stops the clock when "done" button is pressed
        $('#finish').on('click', function() {
            document.body.style.backgroundImage = "url('https://www.insidehook.com/wp-content/uploads/2019/03/Arnold_Header_1496168849.jpg?fit=1200%2C750')";
        checkAnswers();
        stop();
        alert("Game Over!");
        })
    });
    