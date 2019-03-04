import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton'
import {v4} from 'uuid'

const styles = {
  root: {

  },
  menu: {
    zIndex:9,
    position: 'relative',
    height: '35vh',
    width: '20vw',
    padding: '3px',
    cursor: 'pointer'
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
  }
};

class StartMenu extends React.Component {
  constructor(props){
    super(props)
    this.props = props;
    this.state = {
      menuButtonSelected: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    console.log('click');
    this.props.onMenuButtonClick()

  }

  render(){
    console.log(this.props);
    return (
      <Grid style={styles.menu} container justify='center' spacing = {0}>
        {['Play','Saved Games','Account','How To Play','Customize'].map(value => (
          <Grid key={v4()} item xs = {12}>
            <div style={styles.menuItem}>
              <MenuButton selection={value} onMenuButtonClick={this.props.onMenuButtonClick} key={v4()} id={value} />
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }
}

StartMenu.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
};


export default StartMenu;
