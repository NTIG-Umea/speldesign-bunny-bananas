import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 800 },
          debug: false
        }
      }
    });
  }

  create () {
    
    this.gameOver = false;
    this.score = 0;
    //  A simple background for our game
    // this.add.image(400, 300, 'sky');
    this.bg = this.add.image(400, 300, 'sky');
    this.bg.setScrollFactor(0); 
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();
    
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(2000, 568, 'ground').setScale(20, 2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    this.platforms.create(1500, 200, 'ground');
    this.platforms.create(1700, 390, 'ground');
    this.platforms.create(2500, 400, 'ground');
    this.platforms.create(3100, 400, 'ground');
    this.platforms.create(3500, 250, 'ground');
    this.platforms.create(4000, 220, 'ground');



    this.enemy = this.physics.add.sprite(200, 450, 'tomte');
    this.enemy.setCollideWorldBounds(false);
    this.physics.add.collider(this.enemy, this.platforms);
    this.enemy.setBounce(0.2);




    // The player and its settings
    this.player = this.physics.add.sprite( 2000, 450, 'prast');


    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.4);
    this.player.setCollideWorldBounds(false);
    this.physics.add.collider(this.player, this.enemy);

    // kamera som följer spelaren på x
    this.camera = this.cameras.main;
    this.camera.setBounds(-1000, 0, 5000, 600); // lite random "värld-bounds"
    this.camera.startFollow(this.player);

    //  Our player animations, turning, walking left and walking right.

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('necromancer', {
        frames: [
          'necromancer_idle_anim_f0',
          'necromancer_idle_anim_f1',
          'necromancer_idle_anim_f2',
          'necromancer_idle_anim_f3']
      }),
      frameRate: 5,
      repeat: -1
    });
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    /*
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
*/
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    //this.physics.add.collider(this.stars, this.platforms);
    //this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    //this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);s
  }
  update () {
    // if (this.gameOver)
    // {
    //     return;
    // }
    let speed = 400;

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-speed);

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(speed);

      this.player.anims.play('right', true);
    }
    else
    {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
      this.player.setVelocityY(-560);
    }
  }
/*
  collectStar (player, star)
  {
    star.disableBody(true, true);

      //  Add and update the score
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      if (this.stars.countActive(true) === 0)
      {
          //  A new batch of stars to collect
          this.stars.children.iterate(function (child) {

              child.enableBody(true, child.x, 0, true, true);

          });

          var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

          var bomb = this.bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;

      }
    }

  hitBomb (player, bomb)
  {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
  }*/
}
