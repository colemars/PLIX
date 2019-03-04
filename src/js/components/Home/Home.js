import React from 'react';
import Body from './Body/Body';
import Header from './Header/Header';
import { Sprite, Stage } from "react-pixi-fiber";
import RotatingBunny from "../../sketches/RotatingBunny"

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x3D9CA8
};

const styles = {
  gamecontainer: {
    width: '800px',
    height: '600px',
    backgroundColor: 'beige',
    border: '1px solid black',
    position: 'relative',
    margin: '0 auto',
  },
  canvas: {
      position: 'absolute',
       zIndex: 1
     },
  gamestartscreen: {
    position: 'relative',
    zIndex: 2,
  }
}
class Menu extends React.Component {
  render() {
    return (
      <div>
        <Stage style = {styles.canvas} options={OPTIONS} width={window.innerWidth} height={window.innerHeight}>
       <RotatingBunny x={window.innerWidth / 2} y={window.innerHeight / 2} />
      </Stage>
        <div style={styles.gamestartscreen}>
          <Header />
          <Body />
        </div>
      </div>
    );
  }
}

export default Menu;
