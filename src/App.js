import React, { Component } from 'react';
import './App.css';
import fail from './fail.png';

function capitalize(text) {
    return text.replace(/\b./g, m => m.toUpperCase());
}

class App extends Component {
  render() {
    const tokens = window.location.hostname.split('.');
    let subject = 'Something will';
    if (tokens.length === 3) {
      subject = capitalize(tokens[0]);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={fail} className="fail-mark" alt="fail mark" />
          <h1 className="App-title">{subject} always fail.</h1>
        </header>
      </div>
    );
  }
}

export default App;
