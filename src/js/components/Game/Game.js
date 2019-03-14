import Phaser from "phaser";
import React from 'react';
import ExampleScene from '../../scenes/ExampleScene'
import gameSetup from '../../scenes/gameSetup'
import JumpingGame from '../../scenes/JumpingGame'
import Falling from '../../scenes/Falling'
import UIScene from '../../scenes/UIScene'




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
      width: 1280,
      height: 720,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
      },
      parent: 'phaser-game',
      scene: [Falling, UIScene],
      canvasStyle: 'display: block',
      scale: {
       parent: 'phaser-example',
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.DOM.CENTER_BOTH,
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
