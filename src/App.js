import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';
import Generic from './Generic.js';
import Backups from './Backups.js';
import Footer from './Footer.js';

const APP_MAP = [
    { app: Backups, regex: /^(backup|harddrive|hdd|drive|storage)/},
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
        <Footer/>
      </div>
    );
  }
}

export default App;
