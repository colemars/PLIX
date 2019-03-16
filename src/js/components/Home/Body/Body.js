import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Title from './Title';
import StartMenu from './StartMenu';
import SelectedMenu from './SelectedMenu';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { buttonProps: state.buttonProps };
};

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

class Body extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      selection: null
    };
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
  }

  handleMenuButtonClick(selection){
    this.setState({selection: selection});
  }

  render(){
    let selectedMenu = this.props.buttonProps.selected ? <SelectedMenu selection = {this.state.selection} /> : null;
    return (
      <div>
        <Title />
        <Grid item xs = {12}>
          <Grid container justify = 'center' spacing = {0}>
            <Grid style = {styles.menu} key = {0} item>
              <StartMenu onMenuButtonClick = {this.handleMenuButtonClick} />
            </Grid>
            <Grid style = {styles.menu} key = {1} item>
              {selectedMenu}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Body.propTypes = {
  buttonprops: PropTypes.object.isRequired
};

const Page = connect(mapStateToProps)(Body);

export default Page;
