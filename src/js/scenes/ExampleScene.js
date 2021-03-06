import store from '../store';
import { TOGGLE_UI } from '../constants/action-types';
import { toggleUi } from '../actions/index';
import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

export default class ExampleScene extends Phaser.Scene {

  preload(){
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/platformSmall.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('dude',
      'assets/images/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    const gameState = [];
    const brickWidth = 128;
    const brickHeight = 32;

    for (let i=0;i<32;i++) {
      gameState.push([]);
      for (let z=0;z<5;z++){
        gameState[i].push([brickWidth*z, brickHeight*z]);
      }
    }
    console.log(gameState);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const platformDimensions = {
      width: this.textures.get('ground').source[0].width,
      height: this.textures.get('ground').source[0].height
    };
    const platforms = this.physics.add.staticGroup();
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
    const text = this.add.text(250, 250, 'Toggle UI', {
      backgroundColor: 'white',
      color: 'blue',
      fontSize: 48
    });
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.bombs = this.physics.add.group();

    let ground = platforms.create(this.sys.game.config.width/2, this.sys.game.config.height-platformDimensions.height/2, 'ground');
    ground.scaleX = 10;
    console.log(this.sys.game.config.height);
    // ground.y = window.innerHeight
    console.log(ground.y);
    ground.refreshBody();

    let bricks = [];
    bricks.push(platforms.create(0, 220, 'ground').setOrigin(0, 0).refreshBody());
    bricks.push(platforms.create(128, 220, 'ground').setOrigin(0, 0).refreshBody());
    bricks.push(platforms.create(256, 220, 'ground').setOrigin(0, 0).refreshBody());
    bricks.push(platforms.create(384, 220, 'ground').setOrigin(0, 0).refreshBody());
    bricks.push(platforms.create(512, 220, 'ground').setOrigin(0, 0).refreshBody());

    console.log(this.sys.game.config.width);

    console.log(platforms.children.entries);

    for (let brick of bricks) {

    }

    console.log(platforms, 'this');

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });



    text.setInteractive({ useHandCursor: true });

    text.on('pointerup', () => {
      store.dispatch({ type: TOGGLE_UI });
    });


    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.collider(this.bombs, platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

  }

  collectStar (player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
  }

  hitBomb (player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.gameOver = true;
  }


  update(){

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-630);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleUi: toggle => dispatch(toggleUi(toggle))
  };
}
