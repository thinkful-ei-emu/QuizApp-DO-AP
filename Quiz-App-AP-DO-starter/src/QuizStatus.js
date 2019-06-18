import Renderer from './lib/Renderer';


class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`

    return `
      <div>
      <span>
      <div>Score: ${this.model.score} High Score: Score here Progress: 1 of 5 </div>
      </span>
      </div>
    `;
  }
}
// Renderer.renderAll();
export default QuizStatus;