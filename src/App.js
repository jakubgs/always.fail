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
    console.log('TOKENS', tokens);
    console.log('TOKENS', tokens.slice(0, tokens.length - 2));
    if (tokens.length >= 3) {
      let words = tokens.slice(0, tokens.length - 2);
      subject = capitalize(words.join(' '));
    }
    let ending = tokens[0].endsWith('s') ? 'fail' : 'fails';
    return (
      <div className="App">
        <header className="App-header">
          <img src={fail} className="fail-mark" alt="fail mark"/>
          <h1 className="App-title">{subject} will always {ending}.</h1>
        </header>
      </div>
    );
  }
}

export default App;
