import React, { Component } from 'react';
import Home from './js/components/Home/Home'
import Helmet from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{`body { margin: 0; width:100%; height:100%;}`}</style>
          <style>{`html { height:100%; background-color: #3D9CA8}`}</style>
        </Helmet>
          <Home />
      </div>
    );
  }
}

export default App;
