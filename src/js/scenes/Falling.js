import store from "../store";
import { TOGGLE_UI } from "../constants/action-types";
import { toggleUi } from "../actions/index";
import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";
import EasyStar from "easystarjs";
import GrayscalePipeline from "../GrayScalePipeline.js"

export default class Falling extends Phaser.Scene {

  constructor () {
    super({key: 'Falling', active: true});

    this.score = 0;
  }

  preload(){
    this.load.image('tiles', 'assets/platformertiles-extruded.png')
    this.load.audio('backgroundMusic', 'assets/audio/adventure.mp3')
    this.load.audio('magicTrap2', 'assets/audio/magicTrap2.mp3')
    this.load.audio('fireballSound', 'assets/audio/sfx_exp_short_hard15.wav')
    this.load.audio('footsteps', 'assets/audio/sfx_movement_footsteps1b.wav')
    this.load.audio('jumpSound', 'assets/audio/sfx_movement_jump19_landing.wav')
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
      'assets/images/sparkling-fireball-wind-128.png',
      { frameWidth: 128, frameHeight: 128}
    );
    this.load.spritesheet('explodingFireball',
      'assets/images/exploding-fireball-128.png',
      { frameWidth: 128, frameHeight: 128 }
    );
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('platformertiles', 'tiles', 32, 32,   1,2);
    const backgroundLayer = map.createStaticLayer('background', tiles, 0, 0);
    const foregroundLayer = map.createDynamicLayer('foreground', tiles, 0, 0);

    this.trueHeight = backgroundLayer.height;
    this.trueWidth = backgroundLayer.width;

    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.magicTrapSound = this.sound.add('magicTrap2');
    const footStepsSoundConfig = {
      mute: false,
      volume: .2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 5
    }
    this.footSteps = this.sound.add('footsteps', footStepsSoundConfig);
    this.footStepsTimeOut = true;


    foregroundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = backgroundLayer.width;
    this.physics.world.bounds.height = backgroundLayer.height;

    this.bats = this.physics.add.group({
      key: 'bat',
      repeat: 37,
      setXY: { x: 550, y: 750, stepX: 45, stepY: 150 }
    });
    this.bats.children.iterate((child) => {
      child.setCollideWorldBounds(true); // don't go out of the map
      child.body.setAllowGravity(false);
      child.flyingRight = true;
      child.flyingLeft = false;
      child.body.immovable = true;
      child.health = 1;
    })

    this.flame = this.physics.add.sprite(460, 100, 'flame');

    this.portal = this.physics.add.sprite(620, backgroundLayer.height+400, 'flame').setScale(4);
    this.portal.flipY = true;
    this.portal.body.moves = false;

    this.player = this.physics.add.sprite(10, 10, 'dude');
    this.player.setBounce(0); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.player.setGravityY(100);
    this.player.setMaxVelocity(1000, 800);

    this.startGame();

    this.jumpSound = this.sound.add('jumpSound');

    this.fireballs = this.physics.add.group();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pauseButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.anims.create({
      key: 'flame',
      frames: this.anims.generateFrameNumbers('flame',{start: 0, end: 56}),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'portal',
      frames: this.anims.generateFrameNumbers('flame',{start: 21, end: 40}),
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
      key: 'explodingFireball',
      frames: this.anims.generateFrameNumbers('explodingFireball',{start: 0, end: 56}),
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
    this.grayscalePipeline.setIntensity(1);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(foregroundLayer, this.player);
    this.physics.add.collider(this.bats, this.player, this.playerEnemyCollide, null, this);
    this.physics.add.collider(foregroundLayer, this.bats);
    this.physics.add.collider(foregroundLayer, this.flame);
    this.physics.add.collider(this.fireballs, foregroundLayer, this.fireballExplode, null, this);
    this.physics.add.collider(this.fireballs, this.bats, this.fireballExplode, null, this);
    this.physics.add.overlap(this.player, this.flame, this.beginJourney, null, this);
  }

  playerEnemyCollide(player, enemy){
    this.events.emit('loseHealth');
    enemy.flyingLeft = !enemy.flyingLeft;
    enemy.flyingRight = !enemy.flyingRight;
    player.health -= 1;
    enemy.health -=1;
    player.setTint(0xFF1100);
    this.cameras.main.shake(50,0.05)
    setTimeout(()=> {
      player.clearTint();
    },100)
    if(enemy.health < 1){
      enemy.setTint(0xFF1100)
      enemy.disableBody(true, true);
    }
  }



  beginJourney(player, flame){
    this.beginJourney = true;
    if(this.player.journeyBegan === false){
      this.player.journeyBegan = true;
      console.log('begin');
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
            this.magicTrapSound.play();
            this.updatePlayerAlpha(this.player, true);
          },
          onComplete: () => {
            setTimeout(()=> {
              this.player.body.moves = true;
              this.backgroundMusic.play();
            },500); this.cameras.main.setRenderToTexture(this.grayscalePipeline);
          },
          onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
          onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
      }, 1000)
    }
  }

  shootFireball(){
    let loop;
    let i=11;
    if(this.player.abilityCoolDown){
      let fade = true;
      setTimeout(()=>{
        this.grayscalePipeline.setIntensity(1);
        clearInterval(loop);
      },500);
      loop = setInterval(()=>{
        let x = 10/i;
        i++;
        this.grayscalePipeline.setIntensity(x);
      },50)
      let fireballSound = this.sound.add('fireballSound')
      fireballSound.play();
      // fireballSound.stop();
      this.player.abilityCoolDown = false;
      this.fireballs.create(this.player.x, this.player.y-20, 'fireball')
      this.fireballs.children.iterate((child) => {
        child.setSize(32, 32, true);
        child.setVelocityY(400);
        child.anims.play('fireball', true);
      })
      this.player.setVelocityY(-100)
    } else {
      setTimeout(()=>{
        this.player.abilityCoolDown = true;
      },10)
    }
  }

  fireballExplode(fireball, enemy){
    fireball.anims.play('explodingFireball', true);
    fireball.setTint(0xFF1100);
    setTimeout(()=>{
      fireball.disableBody(true, true);
    },150);
    enemy.health -= 1;
    if (enemy.health < 1){
      this.player.doubleJump = true;
      this.score += 10;
      this.events.emit('addScore');
      enemy.setTint(0xFF1100)
      enemy.disableBody(true, true);
    }
    console.log(enemy);
  }



  updatePlayerAlpha(player, bool){
    let i=1001;
    let loop;
    let fade = true;
    loop = setInterval(()=>{
      let x = 1000/i;
      if(i > 4000){
        fade = false;
      }
      if( i < 1000){
        fade = true;
      }
      if(fade){
        i+=10;
      }else {
        i-=10;
      }
      player.setAlpha(x);
    },1);
  }

    if(!player.body.onFloor()){
      let fade = true;
       loop = setInterval(()=>{
         let x = 10/i
         if(i === 50){
           fade = false
         }
         if( i < 10){
           fade = true
         }
        if(fade){
          i++
        }else {
          i--
        }
        player.setAlpha(x);
      },50)
    }
  startGame(){
    this.events.emit('newGame');
    this.player.facingDirection = 'right';
    this.player.health = 5;
    this.player.abilityCoolDown = true;
    this.player.doubleJump = true;
    this.player.journeyBegan = false;
    this.score = 0;
    this.gameOver = false;
  }

  update(time, delta){
    this.portal.anims.play('portal', true);
    this.bats.children.iterate((child) => {
      child.anims.play('bat', true);
      if(child.flyingLeft === true){
        child.setVelocityX(-160)
      } if(child.flyingRight === true){
        child.setVelocityX(160)
      }
      if(child.body.blocked.right === true){
        child.flyingRight = false;
        child.flyingLeft = true;
      }
      if(child.body.blocked.left === true){
        child.flyingLeft = false;
        child.flyingRight = true;
      }
    })
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootFireball();
    }
    if (this.cursors.left.isDown) {
      if(this.player.body.onFloor() && this.footStepsTimeOut){
        this.footStepsTimeOut = false;
        this.footSteps.play();
        setTimeout(()=>{
          this.footStepsTimeOut=true
        },250)
      }
      this.player.facingDirection = 'left';
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      if(this.player.body.onFloor() && this.footStepsTimeOut){
        this.footStepsTimeOut = false;
        this.footSteps.play();
        setTimeout(()=>{
          this.footStepsTimeOut=true
        },250)
      }
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
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if(this.player.body.blocked.down){
        this.jumpSound.play()
        this.player.setVelocityY(-300);
      } else if(this.player.doubleJump){
        this.jumpSound.play()
        this.player.doubleJump = false;
        this.player.setVelocityY(-150);
      }
    }
    if ((this.player.body.onFloor() || !this.player.body.touching.none) && !this.player.doubleJump) {
      this.player.doubleJump = true;
      console.log('doublejump restored');
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
    if(this.player.health < 1){

      console.log('game over');
      this.physics.pause();
      this.gameOver = true;
      this.cameras.main.fade(9000);
      setTimeout(()=>{
        this.backgroundMusic.stop();
        this.scene.restart();
      },9000)
    }
    if(this.player.y > this.trueHeight-50){
      if(this.player.journeyBegan === true){
        this.cameras.main.fade(9000);
        this.nextLevel = true;
        setTimeout(()=>{
          this.backgroundMusic.stop();
          this.scene.restart();
        },9000);
      }
    }
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleUi: toggle => dispatch(toggleUi(toggle))
  };
}
