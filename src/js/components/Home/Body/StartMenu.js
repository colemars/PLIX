import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton'
import {v4} from 'uuid'

const styles = {
  root: {

  },
  menu: {
    backgroundColor: 'white',
    height: '35vh',
    width: '20vw',
    borderRadius: '2px',
    borderBottom: '5px solid #B4CCB7',
    padding: '3px'
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
  }
};

function StartMenu(){
  return (

    <Grid style={styles.menu} container justify='center' spacing = {0}>

      {['Play','Saved Games','Account','How To Play','Customize'].map(value => (
        <Grid key={v4()} item xs = {12}>
          <div style={styles.menuItem}>
            <MenuButton selection={value}/>
          </div>
        </Grid>
      ))}
    </Grid>

  );
}

StartMenu.propTypes = {

};


export default StartMenu;
