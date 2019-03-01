import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = {
  root: {

  },
  menu: {
    backgroundColor: 'white',
    height: '30vh',
    width: '20vw',
    borderRadius: '5px'
  },
  menuItem: {
    marginLeft: '20px',
    marginRight: '20px'
  }
};

function SelectedMenu(){
  return (

        <div style={styles.menu}>PLIX.DEV</div>

  );
}

SelectedMenu.propTypes = {

};


export default SelectedMenu;
