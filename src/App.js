import React, { Component } from 'react';
import Menu from './js/components/Menu/Menu'
import Helmet from 'react-helmet';


class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{`body { margin: 0; width:100%; height:100%}`}</style>
          <style>{`html { height:100%; background-color: #707F72}`}</style>
        </Helmet>
        <Menu />
      </div>
    );
  }
}

export default App;
