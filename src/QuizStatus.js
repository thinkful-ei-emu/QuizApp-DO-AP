import Renderer from './lib/Renderer';


class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`

    return `
      <div>
      <span>
      <div> Score: ${this.model.score}</div>
      <div> High Score: ${this.model.highScore()}</div>
      <div> Progress: ${this.model.quizProgress()} </div>
      </span>
      </div>
    `;
  }
}
// Renderer.renderAll();
export default QuizStatus;