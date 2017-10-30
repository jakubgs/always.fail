import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';
import fail from './fail.png';
import quotes from './quotes.json';

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
    let index = Math.floor(Math.random()*(quotes.length-1));
    return (
      <div className="App">
        <header className="App-header">
          <img src={fail} className="fail-mark" alt="fail mark"/>
          <h1 className="App-title">{subject} always fail{plural}.</h1>
        </header>
        <br/>
        <div className="quote" style={{paddingLeft: '30%'}}>
          <blockquote>{quotes[index].text}</blockquote>
          <cite>{quotes[index].author}</cite>
        </div>
      </div>
    );
  }
}

export default App;
