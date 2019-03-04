import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

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
    fontSize: '1.5vw',
    fontFamily: 'Rubik',
    position: 'relative',
    paddingTop: '6px'
  }
};

class MenuButton extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      hovered: false,
      clicked: false,
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      color: '#000',
      borderWidth: 0,
      borderRadius: 5,
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(128, 128, 128, 0.1) inset',
      border: '1px solid #ccc'
    }
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleMouseHover(e){
    this.setState({hovered: !this.state.hovered})
      if (!this.state.hovered) {
      this.setState({boxShadow: '0 15px 10px -10px rgba(31, 31, 31, 0.5)', border: '1px solid #fff'})
      } else {
      this.setState({boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(128, 128, 128, 0.1) inset', border: '1px solid #ccc'})
    }
  }

  handleClick(e){
    this.props.onMenuButtonClick(this.props.selection)
  }

  render(){
    return (
      <div
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={{...styles.button, boxShadow: this.state.boxShadow, border: this.state.border}}
        >
        <div style={styles.text}>
          {this.props.selection}
        </div>
      </div>
    );
  }
}

MenuButton.propTypes = {
  selection: PropTypes.string.isRequired,
  onMenuButtonClick: PropTypes.func.isRequired
};


export default MenuButton;
