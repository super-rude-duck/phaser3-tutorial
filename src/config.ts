import * as Phaser from 'phaser'

import game from './constants/main'

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: game.BACKGROUND_COLOR,
  scale: {
    width: game.SCREEN_WIDTH,
    height: game.SCREEN_HEIGHT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
}
