$(document).ready(function(){
  //object for storing state of quiz app
  var state = {
    currentQuestion: 0,
    quizScore: 0
  }

  //object for storing all custom values for GOT quiz
  var quiz = {
    title: "Game of Thrones Trivia",
    description: "How well do you know the Game of Thrones? Click below to find out.",
    questions: [
      {
        qText: 'Who is Jon Snow?',
        answers: [
          "Cersei's twin brother",
          "Eddard Stark's bastard son",
          "Arya Stark's youngest brother",
          "The last Targaryen"
        ],
        correct: 1
      },
      {
        qText: "What is the name of Arya's direworlf?",
        answers: [
          'Ghost',
          'Grey Wind',
          'Nymeria',
          'Lady'
        ],
        correct: 2
      },
      {
        qText: 'Who is the Queen of Thorns?',
        answers: [
          'Cersei Lannister',
          'Daenerys Targaryen',
          'Lysa Aryn',
          'Olenna Tyrell'
        ],
        correct: 3
      },
      {
        qText: "Which of the following is NOT one of Dany's dragons?",
        answers: [
          'Balerion',
          'Viserion',
          'Rhaegal',
          'Drogon'
        ],
        correct: 0
      },
      {
        qText: "Whom has Tyrion killed?",
        answers: [
          'Joffery Lannister',
          'Davos Seaworth',
          'Catelyn Stark',
          'Tywin Lannister'
        ],
        correct: 3
      }
    ]
  }

  //initialize page
  init();

  //event listener for start
  $('#start').click(function(){
    $('#welcome').hide();
    $('#questions').show();
    renderQuestion();
  });

  //event listener for submit button
  //this breaks required in html form
  $('#container').on('click', '#submit', function(event){
    event.preventDefault();
    //get value from radio button
    try {
      var userAnswer = $('input[name=answer]:checked', '.multiple-choice').val();
      //exception thrown if user doesn't select an answer
      if (!userAnswer) {
        throw console.error('no user input');
      }
      var correctAnswer = quiz.questions[state.currentQuestion].correct;
      //check if userAnswer === correct answer
      //using double equals to check string value against number
      if (userAnswer == correctAnswer){
        $('input[name=answer]:checked').siblings('.fa-check').addClass('js-correct');
        state.quizScore += 1;
      } else {
        //build selector for correct input
        var correctInput = 'input[value="' + correctAnswer +'"]';
        //change style of checked input to wrong feedback
        $('input[name=answer]:checked').siblings('.fa-times').addClass('js-wrong');
        //change style of correct input to correct feedback
        $(correctInput).siblings('.fa-check').addClass('js-correct');
      }
      //switch view of submit and next buttons
      $('#submit').hide();
      $('#next').show();
      }
     catch (error) {
      alert('Please select an answer.');
    }



  });

  //event listener for next button
  $('#container').on('click', '#next', function(event){
    event.preventDefault();
    //update state of current question
    state.currentQuestion += 1;
    if (state.currentQuestion < quiz.questions.length) {
      //render the next question
      renderQuestion();
    } else {
      $('#questions').hide();
      $('#end-page').show();
      renderEnd();
    }
  });

  //event listener for try again button
  $('#container').on('click', '#try-again', function(){
    init();
  });

  //initialize view and state
  function init(){
    //set title and description
    $('#title').text(quiz.title);
    $('#description').text(quiz.description);
    //initial view
    $('#welcome').show();
    $('#questions').hide();
    $('#end-page').hide();
    //initialize state
    state.currentQuestion = 0;
    state.quizScore = 0;
  }

  //render a question
  function renderQuestion(){
    var html = '';
    var numAnswers = quiz.questions[state.currentQuestion].answers.length;
    html += '<form class="multiple-choice">';
    html += '<p class="question-text">' + quiz.questions[state.currentQuestion].qText + '</p>';
    html += '<ul>';
    //loop to create list of answers
    for (var i = 0; i < numAnswers; i++) {
      html += '<li><input type="radio" value="' + i + '" name="answer">' + quiz.questions[state.currentQuestion].answers[i]
      + '</input>'
      + '<i class="fa fa-times" aria-hidden="true"></i>'
      + '<i class="fa fa-check" aria-hidden="true"></i>'
      + '</li>'
    }
    html += '</ul>';
    html += '<div>';
    html += '<button id="submit" type="submit" name="button" class="button">Submit</button>';
    html += '<button id="next" type="submit" name="button" class="button">Next</button>';
    html+='</div>';
    html += '</form>';
    //building the progress bar
    html += '<div id="progress"><div>';
    //generate progress bar
    for (var i = 0; i < quiz.questions.length; i++) {
      if (i <= state.currentQuestion) {
        html += '<span class="completed"></span>';
      } else {
        html+= '<span></span>';
      }
    }
    //end of span div
    html += '</div>'
    //generate feedback
    html += '<p>' + state.quizScore + ' Out of ' + quiz.questions.length + ' Correct</p></div>';
    //render html to questions div
    $('#questions').html(html);
    //initialize state of buttons
    $('#submit').show();
    $('#next').hide();
  }

  function renderEnd(){
    var numberCorrect = state.quizScore;
    var numberWrong = quiz.questions.length - numberCorrect;
    var html = '';
    html += "<p>Congratulations! You're Finished!</p>";
    html += '<div><p class="result"><span class="number-correct">' + numberCorrect + '</span> Correct</p>';
    html += '<p class="result"><span class="number-wrong">' + numberWrong + '</span> Wrong</p></div>';
    html += '<button id="try-again" class="button">Try Again</button>';
    //render html in end-page div
    $('#end-page').html(html);
  }
});
