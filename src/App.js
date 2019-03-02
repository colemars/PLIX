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
          <style>{`html { height:100%; background-color: #707F72}`}</style>
        </Helmet>
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Home} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
