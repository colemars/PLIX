import "p5/lib/addons/p5.dom";
import PropTypes from 'prop-types';

export default function Sketch(p) {

  let cnv;

  p.setup = function() {
    cnv = p.createCanvas(window.innerWidth, window.innerHeight);
    cnv.style('display', 'block');
    cnv.style('position', 'fixed');
    cnv.style('z-index', 1);
    p.background('#707F72');
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.width && props.height){
      p.resizeCanvas(props.width, props.height);
    }

  };

  p.rectangles = function() {

  };

  p.draw = function() {
    p.background('#707F72');
    p.rectangles();
  };

}

Sketch.propTypes = {
  Width: PropTypes.object.isRequired,
  Height: PropTypes.object.isRequired
};
