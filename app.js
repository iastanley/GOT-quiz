var state = {
  currentQuestIndex: 0,
  quizScore: 0,
  total: function(){
    return state.questions.length;
  }
  questions: [
    {
      qText: 'Who is Jon Snow?',
      answers: [
        {option: "Cersei's twin brother", correct: false},
        {option: "Eddard Stark's bastard son", correct: true},
        {option: "Arya Stark's youngest brother", correct: false},
        {option: "The last Targaryen", correct: false}
      ]
    },
    {
      qText: "What is the name of Arya's direworlf?",
      answers: [
        {option: 'Ghost', correct: false},
        {option: 'Grey Wind', correct: false},
        {option: 'Nymeria', correct: true},
        {option: 'Lady', correct: false}
      ]
    },
    {
      qText: 'Who is the Queen of Thorns?',
      answers: [
        {option: 'Cersei Lannister', correct: false},
        {option: 'Daenerys Targaryen', correct: false},
        {option: 'Lysa Aryn', correct: false},
        {option: 'Olenna Tyrell', correct: true}
      ]
    }
  ]
}

//update current question index
function updateCurrentQuestion(state){
  state.currentQuestIndex++;
}

//update score
function updateScore(state, userAnswer){
  //if user answer is correct
  if (isCorrect(state, userAnswer)()) {
    state.quizScore++;
  }
}

//check if the users answer is correct for current question
function isCorrect(state, userAnswer){
  //returns true if userAnswer is correct
  //userAnswer value will serve as index for answers array
  return state.questions[currentQuestIndex].answers[userAnswer].correct;
}

//render a question
function renderQuestion(state, element){
  //render the current question to HTML
}

function toggleButton(submitButton, nextButton){
  submitButton.toggleClass('display-btn');
  nextButton.toggleClass('display-btn');
}

//render answer whether correct or wrong
function renderFeedback(state, userAnswer, answerElement, progressElement){
  //if the answer is wrong render feedback for wrong answer
  //if answer is correct render feedback for correct answer
  //update progressElement with correct out of total from state
}

//EVENT LISTENERS

//submit answer event handlers
function submitHandler(state, formElement, answerElement, progressElement){
  formElement.on('submit', function(event){
    event.preventDefault();
    //store user answer
    var userAnswer = Number($('input[name="answer"]:checked').val());

    updateScore(state, userAnswer);
    renderFeedback(state, userAnswer, answerElement, progressElement);
    toggleButton($('.submit-btn'), $('.next-btn'));
  });
}

//next button handler
function nextHandler(state, formElement, nextBtnSelector){
  formElement.on('click', nextBtnSelector, function(){
    if (state.currentQuestIndex < state.questions.length) {
      updateCurrentQuestion(state);
      renderQuestion(state, formElement);
      /*update progress bar would also go here*/
      toggleButton($('.submit-btn'), $('.next-btn'));
    } else {
      //link to new html page
      window.location.href = 'end-page.html';
    }
  });
}
