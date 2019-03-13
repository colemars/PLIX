import store from "../store";
import { TOGGLE_UI } from "../constants/action-types";
import { toggleUi } from "../actions/index";
import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";
import EasyStar from "easystarjs"

export default class Falling extends Phaser.Scene {

  preload(){
    this.load.image('tiles', 'assets/platformertiles-extruded.png')
    this.load.tilemapTiledJSON('map', 'assets/falling-game-map.json')
    this.load.spritesheet('dude',
      'assets/images/otherDude4.png',
      { frameWidth: 32, frameHeight: 48 }
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

    this.player = this.physics.add.sprite(10, 10, 'dude');
    this.player.setBounce(0.1); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.player.setGravityY(100)
    this.player.facingDirection = 'right';

    this.cursors = this.input.keyboard.createCursorKeys();
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
      key: 'jumpLeft',
      frames: [ { key: 'dude', frame: 17 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'jumpRight',
      frames: [ { key: 'dude', frame: 16 } ],
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
      key: 'turnOld',
      frames: [ { key: 'dude', frame: 8 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 10, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

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
    if (!this.player.body.onFloor()){
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
