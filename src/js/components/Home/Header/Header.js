import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import VolumeHigh from 'mdi-material-ui/VolumeHigh'
import Settings from 'mdi-material-ui/Settings'
import ChartBar from 'mdi-material-ui/ChartBar'

const styles = {
  menuIcon: {
    zIndex:2,
    position: 'relative',
    paddingLeft: '2%',
    paddingRight: '2%',
    color: 'white',
    width: '3vw',
    height: 'auto',
    float: 'right'
  },
  userName: {
    zIndex:2,
    position: 'relative',
    color: 'white',
    fontSize: '2vw',
    marginLeft: '1%',
    fontFamily: 'Rubik'
  },
  headerBox: {
    zIndex:2,
    position: 'relative',
    paddingTop: '1%'
  }
}

function Header(){
  return (
    <Grid style={styles.headerBox} container spacing = {0}>
      <Grid item xs = {10}>
        <span style = {styles.userName}> domedisorder  </span>
        </Grid>
        <Grid item xs = {2}>
        <VolumeHigh style = {styles.menuIcon} />
        <Settings style = {styles.menuIcon}/>
        <ChartBar style = {styles.menuIcon} />
      </Grid>
    </Grid>
  );
}

Header.propTypes = {

};

export default Header;
