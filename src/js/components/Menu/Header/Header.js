import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import VolumeHigh from 'mdi-material-ui/VolumeHigh'
import Settings from 'mdi-material-ui/Settings'
import ChartBar from 'mdi-material-ui/ChartBar'

const styles = {
  volume: {
    color: 'white',
    right: '1%',
    position: 'fixed',
    width: '3%',
    height: 'auto',
    marginTop: '1%'
  },
  settings: {
    color: 'white',
    right: '5%',
    position: 'fixed',
    width: '3%',
    height: 'auto',
    marginTop: '1%'
  },
  chart: {
    color: 'white',
    right: '9%',
    position: 'fixed',
    width: '3%',
    height: 'auto',
    marginTop: '1%'
  },
  userName: {
    color: 'white',
    fontSize: '3vw',
    marginTop: '1%',
    marginLeft: '1%',
    fontFamily: 'Rubik'
  },
  bar: {
    marginTop: '1%',
  }
}

function Header(){
  return (
    <Grid container spacing = {0}>
      <Grid item lg = {12}>
        <span style = {styles.userName}> colemars </span>
        <VolumeHigh style = {styles.volume} />
        <Settings style = {styles.settings}/>
        <ChartBar style = {styles.chart} />
      </Grid>
    </Grid>
  );
}

Header.propTypes = {

};

export default Header;
