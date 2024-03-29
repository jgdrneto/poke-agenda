import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './app/App';

import { BrowserRouter, Route } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';
/*
ReactDOM.render(
  <React.StrictMode>
    <PokePage/>
  </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <React.StrictMode>
  	<BrowserRouter>
			<Route path="/" component={App} />    
  	</BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
