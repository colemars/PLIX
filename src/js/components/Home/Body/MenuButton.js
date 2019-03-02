import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = {
  button: {
    zIndex:9,
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    backgroundColor: '#353535',
    textAlign: 'center',
  },
  text:{
    zIndex:9,
    position: 'relative',
    color: 'white',
    fontSize: '1.5vw',
    fontFamily: 'Rubik',
    position: 'relative',
    paddingTop: '6px'
  }
};

function MenuButton(props){
  return (
    <div style={styles.button}>
      <div style={styles.text}>
        {props.selection}
      </div>
    </div>
  );
}

MenuButton.propTypes = {
  selection: PropTypes.string.isRequired
};


export default MenuButton;
