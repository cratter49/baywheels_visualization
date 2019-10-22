// React
import React from 'react';
import ReactDOM from 'react-dom';

// Third Party Libraries
import 'typeface-roboto';

// Utilities
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

// Components
import { Chat, Login, Signup } from './Chat';
import { NotFound } from './Utilities';

require("babel-polyfill");

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/chat" component={Chat} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

module.hot.accept();