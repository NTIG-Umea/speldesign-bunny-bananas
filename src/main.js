import Phaser from 'phaser';
import Hiscore from '../Hiscore.js';
import gameConfig from './gameConfig.js';

function newGame () {
  if (game) return;
  game = new Phaser.Game(gameConfig);
  game.score = 0;
}

function destroyGame () {
  if (!game) return;
  game.destroy(true);
  game.runDestroy();
  game = null;
}

let game;

if (module.hot) {
  module.hot.dispose(destroyGame);
  module.hot.accept(newGame);
}

if (!game) newGame();
