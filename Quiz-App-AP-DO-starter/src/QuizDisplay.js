import $ from 'jquery';
import Renderer from './lib/Renderer';
import Model from './lib/Model';
import Quiz from './Quiz';
import Question from './Question';

class QuizDisplay extends Renderer {
  
  constructor(model,el){
    
    super(model,el);
  }
  
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit .Answers': 'handleSubmit', 


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
      }
      else{
        if (this.model.getCurrentQuestion().getAnswerStatus() === 0){

        
          html = this.generateAnswerIfWrong();
        }
      }
    }
    
    return html;
  }


  handleStart() {
    this.model.startGame();
    // this._generateQuestion();
    // Model.update();

  }

  _currentQuestion(){
    return `<div>

            <form class = "Answers">
            <h1>${this.model.getCurrentQuestion().text}</h1>

            <input type="radio" name="Answer" id="A" value="${this.model.getCurrentQuestion().answers[[0]]}"/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[0]]}" </label>
            <input type="radio" name="Answer" id="B" value="${this.model.getCurrentQuestion().answers[[1]]}"/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[1]]}" </label>
            <input type="radio" name="Answer" id="C" value="${this.model.getCurrentQuestion().answers[[2]]}"/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[2]]}" </label>
            <input type="radio" name="Answer" id="D" value="${this.model.getCurrentQuestion().answers[[3]]}"/>
            <label for = "Answer"> "${this.model.getCurrentQuestion().answers[[3]]}" </label>
          <button type="submit" class="submit" name="submit" id="submit">Submit</button>
          </form>
      </div>`;
  }

  generateAnswerIfWrong(){
    console.log('You are wrong!');
    return `<div>
          <h1>${this.model.getCurrentQuestion().text}</h1>
          <p> Sorry, that's incorrect. </p>
          <p> You answered: </p>
          <p> ${this.model.getCurrentQuestion().userAnswer} </p>
          <p> The correct answer was: </p>
          <p> ${this.model.getCurrentQuestion().correctAnswer} </p>
          <button type = "submit" class = "submit" name ="continue"> Continue </button>
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
    </div>
    <button type = "submit" class = "submit" name ="continue"> Continue </button>
    `;


  }

  handleSubmit(event){
    event.preventDefault();
    console.log('Hi there!');
    let answer=$('input[name=Answer]:checked').val(); 
    console.log(answer);
    this.model.answerCurrentQuestion(answer);

  }

}

export default QuizDisplay;
