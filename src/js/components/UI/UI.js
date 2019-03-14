import React, { Component } from "react";
import { connect } from "react-redux";
import { Transition } from "react-spring";
import Grid from '@material-ui/core/Grid';
import {v4} from 'uuid';
import MenuButton from '../Home/Body/MenuButton'



import { GAME_HEIGHT, GAME_WIDTH } from "../../config";

const styles = {
  button: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'center',
    textDecoration: 'none',
    transformStyle: 'flat',
    transition: 'all 250ms ease-out',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(128, 128, 128, 0.1) inset',
    borderColor: '#dedede',
    zIndex:9,
    boxSizing: 'border-box',
    border: '1px solid #ccc',

  },
  text:{
    zIndex:9,
    position: 'relative',
    fontSize: '64px',
    fontFamily: 'Rubik',
    position: 'relative',
    paddingTop: '6px'
  },
  menu: {
    zIndex:9,
    position: 'relative',
    height: 150,
    width: GAME_WIDTH/4,
    padding: '3px',
    cursor: 'pointer'
  },
};

const LEFT_UI_WIDTH = 50;

class UI extends React.Component {
  state = {
    leftOffset: 0
  }

  componentDidMount() {
    this.setState({ leftOffset: this.calculateLeftOffset() })

    window.addEventListener('resize', () => {
      this.setState({ leftOffset: this.calculateLeftOffset() })
    })
  }

  calculateLeftOffset = () => {
    return window.innerWidth / 2 - ((GAME_WIDTH/4)/2)
  }

  render() {
    console.log(this.props);
    const { showUi } = this.props
    const { leftOffset } = this.state
    return (
      <div>
        {/* Left */}
        {/* Top */}
        <div>
          <Transition
            items={showUi}
            from={{ marginTop: -GAME_HEIGHT/2 }}
            enter={{ marginTop: 100 }}
            leave={{ marginTop: -GAME_HEIGHT/2 }}
          >
            {show =>
              show &&
              (props => (
                <div
                  style={{
                    ...props,
                    position: 'absolute',
                    width: GAME_WIDTH/4,
                    height: 300,
                    opacity: 0.9,
                    top: 0,
                    left: leftOffset,
                  }}
                >
                <div style={{
                  ...props,
                  fontSize: '1.5vw',
                  fontFamily: 'Rubik',
                  position: 'relative',
                  opacity: 0.9,
                  top: 0
                }}>
                <Grid style={styles.menu} container spacing = {0}>
                  {['Home','Saved Games','Account','How To Play','Customize'].map(value => (
                      <Grid key={v4()} item xs = {12}>
                        <div style={styles.menuItem}>
                          <MenuButton selection={value} key={v4()} id={value} />
                        </div>
                      </Grid>
                  ))}
                </Grid>
                </div>
              </div>
              ))
            }
          </Transition>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { showUi: state.showUi};
};

export default connect(mapStateToProps)(UI);
