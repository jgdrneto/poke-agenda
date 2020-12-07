import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Page from './page/Page';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
			<Switch>
        <Route exact path="/" component={Page}/>
        <Route path="/:mode/:id" component={Page}/>
      </Switch>    
  	</BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
