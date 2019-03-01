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
    borderRadius: '5px',
  },
  test: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    border: '1px solid red',
  },
  menuItem: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '5px',
    border: '1px solid blue',
  }
};

function StartMenu(){
  return (

    <Grid style={styles.menu} container justify='center' spacing = {0}>

      {[0,1,2,3,4].map(value => (
        <Grid key={value} item xs = {12}>
          <div style={styles.menuItem}>
            <div style={styles.test}>
            Hello
            </div>
          </div>
        </Grid>
      ))}
    </Grid>

  );
}

StartMenu.propTypes = {

};


export default StartMenu;
