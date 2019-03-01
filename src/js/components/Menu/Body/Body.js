import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = {
  root: {

  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '8vw',
    fontFamily: 'Rubik'
  },
};

function Body(){
  return (
    <div style = {styles.root}>
      <Grid container spacing = {0}>
        <Grid item lg = {12}>
          <div style = {styles.title}>PLIX.DEV</div>
        </Grid>
      </Grid>
    </div>
  );
}

Body.propTypes = {

};


export default Body;
