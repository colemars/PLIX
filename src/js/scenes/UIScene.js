import store from "../store";
import { TOGGLE_UI } from "../constants/action-types";
import { toggleUi } from "../actions/index";
import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";

export default class UIScene extends Phaser.Scene {

  constructor () {
    super({key: 'UIScene', active: true});

    this.score = 0;
    this.health =5;
  }

  create () {
       //  Our Text object to display the Score
       let info = this.add.text(10, 10, 'Score: 0', { font: '32px Arial', color: 'white' });
       let health = this.add.text(160, 10, 'Health: 5', { font: '32px Arial', color: 'white' });
       //  Grab a reference to the Game Scene
       let ourGame = this.scene.get('Falling');
       //  Listen for events from it
       ourGame.events.on('addScore', function () {
           this.score += 10;
           info.setText('Score: ' + this.score);
       }, this);
       ourGame.events.on('loseHealth', function () {
           this.health -= 1;
           health.setText('Health: ' + this.health);
       }, this);
       const text = this.add.text(1200, 10, "Menu", {
         color: "white",
         fontSize: 32
       });

       text.setInteractive({ useHandCursor: true });

       text.on("pointerup", () => {
         store.dispatch({ type: TOGGLE_UI });
       });
   }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleUi: toggle => dispatch(toggleUi(toggle))
  };
}
