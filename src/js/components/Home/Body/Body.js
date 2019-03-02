import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Title from './Title';
import StartMenu from './StartMenu';
import SelectedMenu from './SelectedMenu';

const styles = {
  root: {

  },
  title: {
    zIndex:9,
    position: 'relative',
    textAlign: 'center',
    color: 'white',
    fontSize: '8vw',
    fontFamily: 'Rubik'
  },
  menu: {
    zIndex:9,
    position: 'relative',
    marginLeft: '20px',
    marginRight: '20px'
  }
};

function Body(){
  return (
    <div>
    <Title />
    <Grid item xs={12}>
      <Grid container justify='center' spacing = {0}>

        <Grid style={styles.menu} key={0} item>
          <StartMenu />
        </Grid>
        <Grid style={styles.menu} key={1} item>
          <SelectedMenu />
        </Grid>

      </Grid>
    </Grid>
    </div>
  );
}

Body.propTypes = {

};


export default Body;
