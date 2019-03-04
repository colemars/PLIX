import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./js/store/index";
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import index from "./js/index"

WebFont.load({
  google: {
    families: ['Rubik:700', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store}>
   <App />
 </Provider>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
