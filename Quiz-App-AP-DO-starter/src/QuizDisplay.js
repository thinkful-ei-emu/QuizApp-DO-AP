import $ from 'jquery';
import Renderer from './lib/Renderer';
// import Model from './lib/Model';
// import Quiz from './Quiz';
// import Question from './Question';

class QuizDisplay extends Renderer {
  
  constructor(model,el){
    
    super(model,el);
  }
  
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit .Answers': 'handleSubmit', 
      'click .continue': 'handleContinue',

    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }



  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }

    else if(this.model.getCurrentQuestion()){
      if (this.model.getCurrentQuestion().userAnswer === null){
        html = this._currentQuestion();
      }

      else if (this.model.getCurrentQuestion().userAnswer){

        if (this.model.getCurrentQuestion().getAnswerStatus() === 1){
          html = this.generateAnswerIfCorrect();
        }
       else{
            html = this.generateAnswerIfWrong();
      }
    }
  }
  
    else if (this.model.unasked.length === 0){
      html = this.generateQuizEnd();
    }
  
    return html;
  }


  handleStart() {
    this.model.startGame();

  }

  _currentQuestion(){
    return `<div>

            <form class = "Answers">
            <h1>${this.model.getCurrentQuestion().text}</h1>

            <input type="radio" name="Answer" id="A" value="${this.model.getCurrentQuestion().answers[[0]]}" required/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[0]]}" </label>
            <input type="radio" name="Answer" id="B" value="${this.model.getCurrentQuestion().answers[[1]]}" required/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[1]]}" </label>
            <input type="radio" name="Answer" id="C" value="${this.model.getCurrentQuestion().answers[[2]]}" required/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[2]]}" </label>
            <input type="radio" name="Answer" id="D" value="${this.model.getCurrentQuestion().answers[[3]]}" required/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[3]]}" </label>
          <button type="submit" class="submit" name="submit" id="submit">Submit</button>
          </form>
      </div>`;
  }

  generateAnswerIfWrong(){
    return `<div>
          <h1>${this.model.getCurrentQuestion().text}</h1>
          <p> Sorry, that's incorrect. </p>
          <p> You answered: </p>
          <p> ${this.model.getCurrentQuestion().userAnswer} </p>
          <p> The correct answer was: </p>
          <p> ${this.model.getCurrentQuestion().correctAnswer} </p>
          <button type="submit" class="continue">Continue</button>
          </div>
          `;

  }

  generateAnswerIfCorrect(){
    console.log('You are right');
    return `<div>
    <h1>${this.model.getCurrentQuestion().text}</h1>
    <p> You got it! </p>
    <p> The correct answer was: </p>
    <p> ${this.model.getCurrentQuestion().correctAnswer} </p>
    <button type="submit" class="continue">Continue</button>
    </div>`;


  }

  generateQuizEnd() {
    if(this.model.highscore){

    return `<div>
    <h1>Good Job!</h1>
    <p> Your final score was ${this.model.score} out of 5.</p>
    <p> That's a new high score!</p>
    <button class="start-quiz">Play Again</button>
    </div>`;
  }
  else{
    return `<div>
    <h1>Good Job!</h1>
    <p> Your final score was ${this.model.score} out of 5.</p>
    <button class="start-quiz">Play Again</button>
    </div>`;
  }
  
}

  handleSubmit(event){
    event.preventDefault();
    //console.log('Hi there!');
    let answer=$('input[name=Answer]:checked').val(); 
    //console.log(answer);
    this.model.answerCurrentQuestion(answer);

  }

  handleContinue(){
    this.model.nextQuestion();
  }

}

export default QuizDisplay;
