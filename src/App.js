import React, { Component } from 'react';
import './App.css';
import fail from './fail.png';

function capitalize(text) {
    return text.replace(/\b./, m => m.toUpperCase());
}

class App extends Component {
  render() {
    const tokens = window.location.hostname.split('.');
    let subject = 'Something';
    if (tokens.length >= 3) {
      let words = tokens.slice(0, tokens.length - 2);
      subject = capitalize(words.join(' '));
    }
    let plural = tokens[0].endsWith('s') ? '' : 's';
    return (
      <div className="App">
        <header className="App-header">
          <img src={fail} className="fail-mark" alt="fail mark"/>
          <h1 className="App-title">{subject} always fail{plural}.</h1>
        </header>
      </div>
    );
  }
}

export default App;
