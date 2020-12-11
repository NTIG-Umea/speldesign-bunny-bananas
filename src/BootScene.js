import Phaser from 'phaser';
import images from './assets/*.png';
import enemies from '/assets/enemies/*.png';
import jsons from './assets/enemies/*.json';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    var bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1);

    console.table(images);
    console.table(enemies);

    this.load.image('sky', images.sky);
    this.load.image('ground', images.platform);
    this.load.image('star', images.star);
    this.load.image('bomb', images.bomb);
    // this.load.spritesheet('dude', images.dude, { frameWidth: 32, frameHeight: 48 });
    //this.load.multiatlas('tomteWalk', jsons.tomte_walk, enemies);
    this.load.multiatlas('prast', 'assets/prastWalk.json', 'assets/')


    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update () {
    this.scene.start('menu');
    // this.scene.start('play');
    // this.scene.remove();
  }
}
