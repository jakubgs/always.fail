import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';
import Generic from './Generic.js';
import Backups from './Backups.js';

const APP_MAP = [
    { app: Backups, regex: /^(backups|harddrives|hdds|drives|storage)/},
    { app: Generic, regex: /.*/ }
];

class App extends Component {
  render () {
    /* select Component based on regexes matching page FQDn */
    let Contents = APP_MAP.find(page =>
      page.regex.test(window.location.hostname)
    ).app;
    return (
      <div className="App">
        <Contents/>
      </div>
    );
  }
}

export default App;
