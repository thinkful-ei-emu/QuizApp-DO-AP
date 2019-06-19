import Renderer from './lib/Renderer';


class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`

    return `
      <ul class="nav">
      <li class="score"> Score: ${this.model.score}</li>
      <li class="high-score"> High Score: ${this.model.highScore()}</li>
      <li class="progress"> Progress: ${this.model.quizProgress()} </li>
      </ul>
    `;
  }
}
// Renderer.renderAll();
export default QuizStatus;