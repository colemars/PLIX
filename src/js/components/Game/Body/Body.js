import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
    minHeight:'100%',
    width: '100%'
  },
  paper: {
    textAlign: 'left',
    color: '#b3aca7',
    marginTop: '40px',
    marginLeft: '80px',
    marginRight: '80px'
  }
};

function Body(props){
  return (
    <div style = {styles.root}>
      <Grid container spacing = {0}>

        <Grid item lg = {6}>
          <div style = {styles.paper}>Hello</div>
        </Grid>
        <Grid item lg = {6}>
          <div style = {styles.paper}>Hello</div>

        </Grid>
      </Grid>
    </div>
  );
}

Body.propTypes = {

};


export default Body;
