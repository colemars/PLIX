import Phaser from "phaser";
import React from 'react';
import ExampleScene from '../../scenes/ExampleScene'
import gameSetup from '../../scenes/gameSetup'


import { GAME_HEIGHT, GAME_WIDTH } from "../../config";

const styles = {
  canvas: {
      position: 'absolute',
       zIndex: 1
  },
}

export default class IGame extends React.Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      width: 480,
      height: 320,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
      },
      parent: 'phaser-game',
      scene: [gameSetup],
      canvasStyle: 'display: block',
      scale: {
       parent: 'phaser-example',
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.DOM.CENTER_BOTH,
       width: 640,
       height: 960
   },
    }

    new Phaser.Game(config)

  }

  shouldComponentUpdate() {
    return false
  }

  render() {

    return (
      <div styles={styles.canvas} ref={this.myRef} id="phaser-game" />
    )
  }
}
