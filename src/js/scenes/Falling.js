import store from "../store";
import { TOGGLE_UI } from "../constants/action-types";
import { toggleUi } from "../actions/index";
import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";
import EasyStar from "easystarjs";
import {GrayscalePipeline} from "../Pipelines.js"

export default class Falling extends Phaser.Scene {

  preload(){
    this.load.image('tiles', 'assets/platformertiles-extruded.png')
    this.load.tilemapTiledJSON('map', 'assets/falling-game-map2.json')
    this.load.spritesheet('dude',
      'assets/images/otherDude4.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('bat',
      'assets/images/bat.png',
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet('flame',
      'assets/images/magic-flame2.png',
      { frameWidth: 256, frameHeight: 300 }
    );
    this.load.spritesheet('fireball',
      'assets/images/wind_fireball.png',
      { frameWidth: 256, frameHeight: 256 }
    );
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('platformertiles', 'tiles', 32, 32,   1,2);
    const backgroundLayer = map.createStaticLayer('background', tiles, 0, 0);
    const foregroundLayer = map.createDynamicLayer('foreground', tiles, 0, 0);

    foregroundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = backgroundLayer.width;
    this.physics.world.bounds.height = backgroundLayer.height;

    this.bats = this.physics.add.group({
      key: 'bat',
      repeat: 1,
      setXY: { x: 550, y: 300, stepX: 45, stepY: 50 }
    });
    this.bats.children.iterate((child) => {
      child.setCollideWorldBounds(true); // don't go out of the map
      child.body.setAllowGravity(false);
      child.flyingRight = true;
      child.flyingLeft = false;
      child.body.immovable = true;
    })

    this.flame = this.physics.add.sprite(460, 100, 'flame');

    this.player = this.physics.add.sprite(10, 10, 'dude');
    this.player.setBounce(0.1); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.player.setGravityY(100)
    this.player.setMaxVelocity(1000, 800);
    this.player.facingDirection = 'right';
    this.player.health = 10;
    this.player.abilityCoolDown = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
      key: 'flame',
      frames: this.anims.generateFrameNumbers('flame',{start: 0, end: 56}),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'fireball',
      frames: this.anims.generateFrameNumbers('fireball',{start: 0, end: 56}),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'bat',
      frames: this.anims.generateFrameNumbers('bat',{start: 0, end: 16}),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'idleLeft',
      frames: this.anims.generateFrameNumbers('dude',{start: 6, end: 7}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'idleRight',
      frames: this.anims.generateFrameNumbers('dude',{start: 8, end: 9}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'fallLeft',
      frames: [ { key: 'dude', frame: 17 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'fallRight',
      frames: [ { key: 'dude', frame: 16 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'jumpLeft',
      frames: [ { key: 'dude', frame: 19 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'jumpRight',
      frames: [ { key: 'dude', frame: 18 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'test',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'still',
      frames: [ { key: 'flame', frame: 8 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 10, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.grayscalePipeline = this.game.renderer.addPipeline('Grayscale', new GrayscalePipeline(this.game));

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    const cursors = this.input.keyboard.createCursorKeys();
    // const controlConfig = {
    //    camera: this.cameras.main,
    //    left: cursors.left,
    //    right: cursors.right,
    //    up: cursors.up,
    //    down: cursors.down,
    //    speed: 0.5
    // };
   // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

   this.physics.add.collider(foregroundLayer, this.player);
   this.physics.add.collider(foregroundLayer, this.flame);
   this.player.journeyBegan = false;
   this.physics.add.overlap(this.player, this.flame, this.beginJourney, null, this);


  }

  beginJourney(player, flame){
    this.beginJourney = true;
    // player.x = flame.x
    if(this.player.journeyBegan === false){
      setTimeout(()=> {
        flame.anims.play('flame', true);
        const tween = this.tweens.add({
          targets: player,
          y: 50,
          x: flame.x,
          ease: 'Power1',
          duration: 8000,
          yoyo: false,
          repeat: 0,
          onStart: () => {
            this.player.body.moves = false;
            this.updatePlayerAlpha(this.player, true);
          },
          onComplete: () => {
            setTimeout(()=> {
              this.player.body.moves = true;
              console.log(this.player.body.moves);
            },500); this.cameras.main.setRenderToTexture(this.grayscalePipeline);
          },
          onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
          onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
        this.player.journeyBegan = true;
      }, 1000)
    }
  }

  updatePlayerAlpha(player, bool){
    let i=0;
    let z = 1;
    let loop,
        newLoop;

    if(!player.body.onFloor()){
       loop = setInterval(()=>{
        let x = 1/i
        player.setAlpha(x);
        i++
        if(i>10){
          clearInterval(loop)
           newLoop = setInterval(()=>{
            x = .1*z
            player.setAlpha(x);
            z++
            if(z>10){
              clearInterval(newLoop)
              player.setAlpha(1)
              this.updatePlayerAlpha(player)
            }
          },50)
        }
      },50)
    } else {
      clearInterval(loop)
      clearInterval(newLoop)
    }
  }

  update(time, delta){
    if (this.cursors.left.isDown) {
      this.player.facingDirection = 'left';
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.facingDirection = 'right';
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      if(this.player.facingDirection === 'left'){
        this.player.anims.play('idleLeft', true);
      }
      if(this.player.facingDirection === 'right'){
        this.player.anims.play('idleRight', true);
      }
    }
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-300);
    }
    if (this.player.body.velocity.y > 0 && !this.player.body.onFloor()){
      if(this.player.facingDirection === 'left'){
        this.player.anims.play('fallLeft', true);
      }
      if(this.player.facingDirection === 'right'){
        this.player.anims.play('fallRight', true);
      }
    }
    if (this.player.body.velocity.y < 0 && !this.player.body.onFloor()){
      if(this.player.facingDirection === 'left'){
        this.player.anims.play('jumpLeft', true);
      }
      if(this.player.facingDirection === 'right'){
        this.player.anims.play('jumpRight', true);
      }
    }
  }



}

function mapDispatchToProps(dispatch) {
  return {
    toggleUi: toggle => dispatch(toggleUi(toggle))
  };
}
