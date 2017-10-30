import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import './bootstrap.min.css';
import './App.css';
import fail from './fail.png';
import quotes from './quotes.json';

function capitalize(text) {
    return text.replace(/\b./, m => m.toUpperCase());
}

class App extends Component {
  randomQuote () {
    return quotes[Math.floor(Math.random()*(quotes.length-1))];
  }

  getSubject () {
    const tokens = window.location.hostname.split('.');
    let subject = 'Something';
    let plural = 's';

    if (tokens.length >= 3) {
      let words = tokens.slice(0, tokens.length - 2);
      subject = capitalize(words.join(' '));
      plural = tokens[0].endsWith('s') ? '' : 's';
    }
    return `${subject} always fail${plural}.`;
  }

  render () {
    let quote = this.randomQuote();
    let subject = this.getSubject();
    return (
      <div className="App">
        <Helmet>
          <title>{subject}</title>
        </Helmet>
        <header className="App-header">
          <img src={fail} className="logo" alt="fail mark"/>
          <h1 className="App-title">{subject}</h1>
        </header>
        <br/>
        <div className="quote">
          <blockquote>
            {quote.text}
            <cite>{quote.author}</cite>
          </blockquote>
        </div>
      </div>
    );
  }
}

export default App;
