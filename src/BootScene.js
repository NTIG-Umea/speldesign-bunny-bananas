import Phaser from 'phaser';
import images from './assets/*.png';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    var bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1);

    console.table(images);


    this.load.image('sky', images.sky);
    this.load.image('ground', images.platform);
    this.load.image('star', images.star);
    this.load.image('bomb', images.bomb);
    this.load.image('bg', images.BG);
    this.load.image('present', images.Present)
    this.load.multiatlas('prast', 'assets/prast_walk.json', 'assets/')

    this.load.multiatlas('Nisse', 'assets/Nisse.json', 'assets/')

    this.load.multiatlas('attack', 'assets/prast_attack_book.json', 'assets/')
 
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