import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Main from 'Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import css from './index.css';

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
      <Main />
  </MuiThemeProvider>,
    document.getElementById('root')
);
