import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton'
import {v4} from 'uuid'

const styles = {
  menu: {
    zIndex:9,
    position: 'relative',
    backgroundColor: 'white',
    height: '35vh',
    width: '20vw',
    padding: '3px',
  },
  test: {
    zIndex:9,
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    border: '1px solid red',
  },
  menuItem: {
    zIndex:9,
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '5px',
    fontSize: '1.5vw',
    fontFamily: 'Rubik',
  }
};

function SelectedMenu(props){

  return (
    <Grid style={styles.menu} container justify='center' spacing = {0}>
        <Grid key={v4()} item xs = {12}>
          <div style={styles.menuItem}>
            {props.selection}
          </div>
        </Grid>
    </Grid>

  );
}

SelectedMenu.propTypes = {
  selection: PropTypes.string.isRequired
};


export default SelectedMenu;
