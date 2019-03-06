import Phaser from "phaser";
import React from 'react';
import ExampleScene from '../../scenes/ExampleScene'

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
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      parent: 'phaser-game',
      scene: [ExampleScene],
      canvasStyle: 'display: block',
      scale: {
       parent: 'phaser-example',
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.Scale.CENTER_BOTH,
       width: window.innerWidth,
       height: window.innerHeight
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
