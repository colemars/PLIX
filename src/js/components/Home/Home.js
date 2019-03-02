import React from 'react';
import Body from './Body/Body';
import Header from './Header/Header';
import Canvas from './Canvas/Canvas';
import P5Wrapper from 'react-p5-wrapper';
import Sketch from "../../sketches/Test";

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
        <P5Wrapper sketch={Sketch} />
        <div style={styles.gamestartscreen}>
          <Header />
          <Body />
        </div>
      </div>
    );
  }
}

export default Menu;
