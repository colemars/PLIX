import React, { Component } from 'react';
import Home from './js/components/Home/Home'
import Helmet from 'react-helmet';


class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{`body { margin: 0; width:100%; height:100%}`}</style>
          <style>{`html { height:100%; background-color: #707F72}`}</style>
        </Helmet>
        <Home />
      </div>
    );
  }
}

export default App;
