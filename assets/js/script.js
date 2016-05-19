'use script'

class GameField {
  constructor(params) {
    Object.assign(this, params);

    this.field = [];

    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeType = this.changeType.bind(this);
    this.isVictory = this.isVictory.bind(this);
    this.endGame = this.endGame.bind(this);

    this.render();
  }

  render() {
    for (let i = 1; i <= this.height; i++) {
      for (let j = 1; j <= this.width; j++) {
        const element = document.createElement('DIV');
        const color = 'background-'+(Math.round(Math.random()) ? 'blue' : 'red');

        element.setAttribute('data-row', i);
        element.setAttribute('data-column', j);
        element.classList.add('field-item');
        element.classList.add(color);
        element.onclick = this.handleClick;

        if(!this.field[i]) {
          this.field[i] = [];
        }

        this.field[i][j] = element;
        this.rootElement.appendChild(element);
      }
      this.rootElement.appendChild(document.createElement('BR'));
    }
  }

  handleClick(e) {
    const element = e.target;
    this.changeType(element.getAttribute('data-row'), element.getAttribute('data-column'));
    if(this.isVictory()) {
      this.endGame();
    }
  }

  changeType(row, column) {
    for(let i = 1; i < this.field[row].length; i++) {
      const item = this.field[row][i];
      this.switchClasses(item);
    }

    for(let i = 1; i < this.field.length; i++) {
      const item = this.field[i][column];
      this.switchClasses(item);
    }
  }

  isVictory() {
    let requiredColor = this.field[1][1];
    for(let i = 1; i < this.field.length; i++) {
      for(let j = 1; j < this.field[i].length; j++) {
        if(this.field[i][j] != requiredColor) {
          return false;
        }
      }
    }
    return true;
  }

  endGame() {
    this.victoryPopup.innerHTML = 'Victory!!!';
    this.victoryPopup.classList.remove('hidden');
  }

  switchClasses(item) {
    const classToSet = item.classList.contains('background-blue') ? 'background-red' : 'background-blue';
    item.classList.remove(classToSet == 'background-red' ? 'background-blue' : 'background-red');
    item.classList.add(classToSet);
  }
}

const widthInput  = document.getElementById('width');
const heightInput = document.getElementById('height');
const startButton = document.getElementById('start')
const rootElement = document.getElementById('root');
const victoryPopup = document.getElementById('victoryPopup');

startButton.onclick = initialize;

function initialize(e) {
  const gameSettings = document.getElementById('gameSettings');
  const width = widthInput.value;
  const height = heightInput.value;

  const params = {
    width,
    height,
    rootElement,
    victoryPopup
  }

  gameSettings.classList.add('hidden');
  rootElement.classList.remove('hidden');
  const gf = new GameField(params);

}
