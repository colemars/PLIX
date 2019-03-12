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
    this.testLevel = [[0,0,1,0,0],
                     [1,0,1,0,1],
          	         [0,0,1,0,0],
          	         [0,0,1,1,0],
          	         [0,0,0,0,0]];
    this.level = [];
    this.bricks = [];
    this.brickWidth = 80;
    this.brickHeight = 5;
    this.cellWidth = 1;
    this.cellHeight = 1;
    this.availableBricks = 10;

    for (let i=0;i<960;i++) {
      this.gameState.push([])
      for (let z=0;z<640;z++){
        this.gameState[i].push([0,this.cellWidth*z, this.cellHeight*i,'y'])
      }
    }
    console.log(this.gameState);
    for (let i=0;i<960;i++) {
      this.level.push([])
      for (let z=0;z<640;z++){
        this.level[i].push([0])
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
    const startText = this.add.text(50, 250, "Start", {
      backgroundColor: "white",
      color: "blue",
      fontSize: 48
    });
    const findPathText = this.add.text(50, 450, "Find Path", {
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


    let graphics = this.add.graphics();
    let bricks = [];
    const thickness = 1;
    const color = 0x00ff00;
    const alpha = 1;
    // for(let row of this.gameState) {
    //   for (let position of row) {
    //     graphics.lineStyle(thickness, color, alpha);
    //     graphics.strokeRect(position[1], position[2], this.cellWidth, this.cellHeight);
    //     // let drawnObject;
    //     // const bmd = game.add.bitmapData(this.cellWidth, this.cellHeight);
    //     // bmd.ctx.beginPath();
    //     // bmd.ctx.rect(0, 0, width, height);
    //     // bmd.ctx.strokeStyle = '#ffffff';
    //     // bmd.ctx.stroke();
    //   }
    // }



    // for(let i=0;i<6;i++){
    //   bricks.push(platforms.create(this.brickWidth*i*setupScreenScale, 800*setupScreenScale, 'ground').setOrigin(0, 0).refreshBody())
    // }
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
   });
   // const zone = [];
   //  for(let row of this.gameState){
   //    for(let position of row){
   //      if(position[0] === 0){
   //        // bricks.push(platforms.create(position[1]*setupScreenScale, position[2]*setupScreenScale, 'gridObject').setOrigin(0, 0).refreshBody());
   //      }
   //    }
   //  }


    for(let i=0;i<1;i++){
      this.bricks.push(platforms.create(556, 100, 'ground').setOrigin(0, 0).setScale(.8).refreshBody().setInteractive());
    }
    for(let brick of this.bricks){
      brick.on('pointerover', function () {
        this.setTint(0x00ff00);
        console.log(brick.x);
        console.log(brick.y);
      })
      brick.on('pointerout', function () {
        this.clearTint();
      });
      this.input.setDraggable(brick);
    }


    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
      gameObject.setScale(1)
      // gameObject.displayHeight = 27;
    });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      if(gameObject.x > 500){
      } else {
        gameObject.setScale(1)
        // gameObject.displayHeight = 27
      }
      gameObject.refreshBody();
    });
    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.clearTint();
      if(gameObject.x > this.sys.game.config.width-96-gameObject.displayWidth) {
        gameObject.setScale(.8)
        gameObject.x = 556;
        gameObject.y = 100;
      }
    });

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 45 }
    });

    let k = .1;
    this.stars.children.iterate(function (child) {
      child.setBounceY(k);
      k+=.08
      // child.setGravityY(Phaser.Math.FloatBetween(100, 800))
    });

    startText.setInteractive({ useHandCursor: true });

    startText.on("pointerup", () => {
      this.createLevel();
    });

    findPathText.setInteractive({ useHandCursor: true });

    findPathText.on("pointerup", () => {
      this.findPath();
    });

    text.setInteractive({ useHandCursor: true });

    text.on("pointerup", () => {
      store.dispatch({ type: TOGGLE_UI });
    });


    this.player.setBounce(0.1);
    this.player.setGravityY(600)
    this.player.setCollideWorldBounds(true);
    this.player.setScale(.85)

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

  createLevel(){
    for(let row of this.gameState){
      if (row[0][2] < 860){
        for(let position of row){
          if(position[1] < 540 ){
            for(let brick of this.bricks){
              const brickXPositions = [];
              const brickYPositions = [];
              if((position[2] >= Math.round(brick.y)) && (position[2] <= Math.round(brick.y+brick.height))){
                if((position[1] >= Math.round(brick.x)) && (position[1] <= Math.round(brick.x+brick.width))) {
                  position[0] = 1
                  console.log(position[0]);
                }
              } else {
                position[0] = 0;
              }
            }
          }
        }
      }
    }
    console.log(this.gameState);

    for(let i=0;i<this.gameState.length;i++){
      for(let z=0;z<this.gameState[i].length;z++){
        if(this.gameState[i][z][0] === 1){
          console.log('hit');
          this.level[i][z] = 1;
        } else {
          this.level[i][z] = 0;
        }
      }
    }
  }

  findPath(){
    this.easyStar = new EasyStar.js();
    this.easyStar.setGrid(this.level);
    console.log(this.level);
    this.easyStar.setAcceptableTiles([0]);
    this.easyStar.enableDiagonals();
    this.easyStar.enableCornerCutting();
    this.easyStar.findPath(Math.round(this.player.x), Math.round(this.player.y), 200, 200, function( path ) {
        if (path === null) {
	        console.log("The path to the destination point was not found.");
  	    } else {
  	    	for (var i = 0; i < path.length; i++){
  	    		console.log("P: " + i + ", X: " + path[i].x + ", Y: " + path[i].y);
  	    	}

  	    }
	   });
     this.easyStar.calculate();
  }

  collectStar (player, star) {
    // star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      // const bomb = this.bombs.create(x, 16, 'bomb');
      // bomb.setBounce(1);
      // bomb.setCollideWorldBounds(true);
      // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

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
