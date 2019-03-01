import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = {
  root: {

  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '9vw',
    fontFamily: 'Rubik'
  },
};

function Title(){
  return (

          <div style = {styles.title}>PLIX.DEV</div>

  );
}

Title.propTypes = {

};


export default Title;
