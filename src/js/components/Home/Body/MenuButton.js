import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import v4 from "uuid";
import PropTypes from 'prop-types';
import { selectMenu, playGame } from "../../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    selectMenu: select => dispatch(selectMenu(select)),
    playGame: play => dispatch(playGame(play))
  };
}

const mapStateToProps = state => {
  return { buttonProps: state.buttonProps};
};

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

const buttonSelected = {
  boxShadow: '0 15px 10px -10px rgba(31, 31, 31, 0.5)',
  border: '1px solid #fff',
  backgroundColor: '#fff',
}

const buttonHovered = {
  boxShadow: '0 15px 10px -10px rgba(31, 31, 31, 0.5)',
  border: '1px solid #fff',
  backgroundColor: '#fff'
}

const buttonNormal = {
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(128, 128, 128, 0.1) inset', border: '1px solid #ccc',
  backgroundColor: '#fff',
  border: '1px solid #ccc'
}

class MenuButton extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      hovered: false,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleMouseEnter(e){
    this.setState({hovered: true});
  }

  handleMouseLeave(e){
    this.setState({hovered: false});
  }

  handleClick(e){
    if (this.props.selection === 'Play') {
      this.props.playGame();
    }
    if (this.props.selection === 'Home') {
      console.log('hit');
      this.props.playGame();
    } else {
      this.props.selectMenu(this.props.id);
      this.props.onMenuButtonClick(this.props.selection)
    }
  }

  componentWillUnmount(){
    console.log('unmount');
  }

  render(){
    let hoverStyle;
    if (this.props.buttonProps.selectedId === this.props.id){
      hoverStyle = buttonSelected
    } else {
       hoverStyle = this.state.hovered ? buttonHovered : buttonNormal
    }

    styles.button.backgroundColor = hoverStyle.backgroundColor
    styles.button.boxShadow = hoverStyle.boxShadow
    styles.button.border = hoverStyle.border

    console.log(this.state.backgroundColor);

    return (
      <div
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{...styles.button}}
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
  onMenuButtonClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  playGame: PropTypes.bool.isRequired,
  selectMenu: PropTypes.string.isRequired,
  buttonprops: PropTypes.object.isRequired
};

const Button = connect(mapStateToProps, mapDispatchToProps)(MenuButton);

export default Button;
