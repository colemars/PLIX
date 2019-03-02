import React from 'react';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import Sketch from "../../../sketches/Test";


const styles = {
  test: {
    zIndex:2,
    position: 'absolute',
  },
  title: {
    zIndex:9,
    textAlign: 'center',
    color: 'white',
    fontSize: '8vw',
    fontFamily: 'Rubik'
  },
  menu: {
    zIndex:9,
    marginLeft: '20px',
    marginRight: '20px'
  }
};

function Canvas(){
  return (
    <P5Wrapper
            sketch={Sketch}
            id={0}
            width = {window.innerWidth}
            height = {window.innerHeight}
          />
  );
}

Canvas.propTypes = {

};


export default Canvas;
