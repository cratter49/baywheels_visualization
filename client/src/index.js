// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import { MapContainer } from './BayWheels';
import { Login, Signup } from './UserManagement';
import { NotFound } from './Utilities';

// Build Libraries
require("babel-polyfill");

// Third Party Libraries
import 'typeface-roboto';

// Utilities
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

const defaultTheme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        color: 'red',
        fontSize: '15px'
      }
    }
  }
});

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/baywheels" component={MapContainer} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

const app = (
    <ThemeProvider theme={defaultTheme}>
      {routing}
    </ThemeProvider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

module.hot.accept();