import React from 'react';
import Body from './Body/Body';
import Header from './Header/Header';
import { Sprite, Stage } from "react-pixi-fiber";
import RotatingBunny from "../../sketches/RotatingBunny";
import UI from '../UI/UI';
import Game from '../Game/Game';
import { connect } from "react-redux";


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
  constructor(props){
    super(props)
    console.log(this.props, 'here');
  }
  render() {
    console.log(this.props.playGame);
    let ui = this.props.playGame ? <UI /> : null
    let game = this.props.playGame ? <Game /> : null
    let header = !this.props.playGame ? <Header /> : null
    let body = !this.props.playGame ? <Body /> : null
    return (
      <div>
        {ui}
        {game}
        <div style={styles.gamestartscreen}>
          {header}
          {body}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buttonProps: state.buttonProps,
    playGame: state.playGame
  }
};

export default connect(mapStateToProps)(Menu);
