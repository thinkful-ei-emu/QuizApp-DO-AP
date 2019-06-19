import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model';

class Quiz extends Model {

  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();

    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;

    // TASK: Add more props here per the exercise
    this.score = 0;
    this.scoreHistory = [];
    this.highscore = false;

  }

  // Example method:
  startGame() {
    console.log("start game ran")
    this.active = false;
    this.score = 0;
    this.asked = [];
    this.unasked = [];
    this.highscore = false;

    const triviaApi = new TriviaApi();
    triviaApi.fetchQuestions(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => {
        data.results.forEach(questionData => {
          this.unasked.push(new Question(questionData));
          this.nextQuestion();
          this.active = true;
          this.update();
        });
      })
      .catch(err => console.log(err.message));
  }

  getCurrentQuestion() {
    //console.log('get current question ran!')
    return this.asked[0];
  }

  nextQuestion() {
    const currentQ = this.getCurrentQuestion();
    if (currentQ && currentQ.getAnswerStatus() === -1) {
      return false;
    }

    this.asked.unshift(this.unasked.pop());
   
    if(this.asked.length === 6){
      this.endQuiz();
    }

    this.update();
    return true;
  }

  increaseScore() {
    this.score++;    
    this.update();
  }

  answerCurrentQuestion(answerText) {
    //console.log("answerCurrentQUestion ran")
    const currentQ = this.getCurrentQuestion();
    // Cannot find current question, so fail to answer
    if (!currentQ) return false;
    // Current question has already been answered, so refuse to submit new answer    
    if (currentQ.getAnswerStatus() !== -1) return false;

    // Otherwise, submit the answer
    currentQ.submitAnswer(answerText);

    // If correct, increase score
    if (currentQ.getAnswerStatus() === 1) {
      this.increaseScore();
    }
    this.update();
    return true;
  }

  highScore(){
    let highScore = 0;
    if (this.scoreHistory.length === 0){
      return highScore;
    }
    else{
      highScore = Math.max(...this.scoreHistory);
      return highScore;
    }
  }

  endQuiz(){
    if (this.score > this.highScore()){
      this.highscore = true;
    }
    this.scoreHistory.push(this.score);
    this.active = false;
  }

  quizProgress(){
    if(this.active === false){
      return 'Inactive';
    }
    else{
      return `${this.asked.length} of 5`;
    }
  }

}

export default Quiz;