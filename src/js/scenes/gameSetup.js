import store from "../store";
import { TOGGLE_UI } from "../constants/action-types";
import { toggleUi } from "../actions/index";
import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";
import EasyStar from "easystarjs"

export default class ExampleScene extends Phaser.Scene {

  preload(){
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('gridObject', 'assets/images/gridObject.png');
    this.load.image('bg', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('outline', 'assets/images/brickOutline.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.image('platformBottom', 'assets/images/ground.png');
    this.load.image('sideBar', 'assets/images/sideBar.png');
    this.load.image('bottomBar', 'assets/images/bottomBar.png');
    this.load.spritesheet('dude',
      'assets/images/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.gameState = [];
    this.brickWidth = 107;
    this.brickHeight = 32;
    this.availableBricks = 10;

    for (let i=0;i<31;i++) {
      this.gameState.push([])
      for (let z=0;z<6;z++){
        this.gameState[i].push([0,this.brickWidth*z, this.brickHeight*i])
      }
    }
    console.log(this.gameState);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const platformDimensions = {
      width: this.textures.get('ground').source[0].width,
      height: this.textures.get('ground').source[0].height
    }
    const platforms = this.physics.add.staticGroup();
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0).setDisplaySize(this.sys.game.config.width-96, this.sys.game.config.height-100);
    const text = this.add.text(250, 250, "Toggle UI", {
      backgroundColor: "white",
      color: "blue",
      fontSize: 48
    });
    this.score = 0
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.bombs = this.physics.add.group();

    let ground = platforms.create(0-96, this.sys.game.config.height-116, 'platformBottom').setOrigin(0, 0).refreshBody();
    let sideBar = platforms.create(this.sys.game.config.width-96, 0, 'sideBar').setOrigin(0, 0).refreshBody();
    let bottomBar = platforms.create(0, this.sys.game.config.height-85, 'bottomBar').setOrigin(0, 0).refreshBody();

    const setupScreenScale = .85

    let bricks = [];
    // for(let i=0;i<6;i++){
    //   bricks.push(platforms.create(this.brickWidth*i*setupScreenScale, 800*setupScreenScale, 'ground').setOrigin(0, 0).refreshBody())
    // }
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
   });
   const zone = [];
    for(let row of this.gameState){
      for(let position of row){
        if(position[0] === 0){
          // bricks.push(platforms.create(position[1]*setupScreenScale, position[2]*setupScreenScale, 'outline').setOrigin(0, 0).refreshBody());
        }
      }
    }

    const plainBricks = [];
    for(let i=0;i<10;i++){
      plainBricks.push(platforms.create(556, 100, 'ground').setOrigin(0, 0).setScale(.66).refreshBody().setInteractive())
    }
    for(let plainBrick of plainBricks){
      plainBrick.on('pointerover', function () {
        this.setTint(0x00ff00);
      })
      plainBrick.on('pointerout', function () {
        this.clearTint();
      });
      this.input.setDraggable(plainBrick);
    }


    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
      gameObject.setScale(1).scaleX = .85;
      gameObject.displayHeight = 27;
    });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      if(gameObject.x > 500){
      } else {
        // gameObject.setScale(1).scaleX = .85
        // gameObject.displayHeight = 27
      }
      gameObject.refreshBody();
    });
    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.clearTint();
      if(gameObject.x > this.sys.game.config.width-96-gameObject.displayWidth) {
        gameObject.setScale(.66)
        gameObject.x = 556;
        gameObject.y = 100;
      }
    });

    // bricks.push(platforms.create(brickWidth*setupScreenScale, 800, 'ground').setOrigin(0, 0).refreshBody())
    // bricks.push(platforms.create(256*setupScreenScale, 220, 'ground').setOrigin(0, 0).refreshBody())
    // bricks.push(platforms.create(384*setupScreenScale, 220, 'ground').setOrigin(0, 0).refreshBody())
    // bricks.push(platforms.create(512*setupScreenScale, 220, 'ground').setOrigin(0, 0).refreshBody())

    for (let brick of bricks) {
      brick.displayWidth=brick.width*setupScreenScale
      console.log(brick.height, 'height');
      brick.displayHeight=27
      brick.refreshBody()
    }

    const bomb = this.bombs.create(100, 16, 'bomb');
    bomb.setBounce(.1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 45 }
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      // child.setGravityY(Phaser.Math.FloatBetween(100, 800))
    });



    text.setInteractive({ useHandCursor: true });

    text.on("pointerup", () => {
      store.dispatch({ type: TOGGLE_UI });
    });


    this.player.setBounce(0.1);
    this.player.setGravityY(600)
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
    this.physics.add.collider(this.stars, platforms)
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
      this.player.setVelocityY(-400);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleUi: toggle => dispatch(toggleUi(toggle))
  };
}
