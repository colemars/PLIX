import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return { articles: state.articles };
};

const HowToPlay = ({ articles }) => (
  <ul className = "list-group list-group-flush">
    {articles.map(el => (
      <li className = "list-group-item" key = {el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);

const Content = connect(mapStateToProps)(HowToPlay);

HowToPlay.propTypes = {
  articles: PropTypes.string.isRequired,
};

export default Content;
