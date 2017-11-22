import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';
import Generic from './Generic.js';
import Backups from './Backups.js';
import Commies from './Commies.js';
import Me from './Me.js';

const APP_MAP = [
    { app: Me, regex: /^i\./},
    { app: Commies, regex: /^(communist|commies|marxist|socialist)/},
    { app: Backups, regex: /^(backup|harddrive|hdd|drive|storage)/},
    { app: Generic, regex: /.*/ }
];

class App extends Component {
  render () {
    console.log(window.location.hostname);
    /* select Component based on regexes matching page FQDn */
    let Contents = APP_MAP.find(page =>
      page.regex.test(window.location.hostname)
    ).app;
    return <Contents/>;
  }
}

export default App;
