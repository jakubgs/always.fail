import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

class Me extends Component {
  render () {
    return (
      <div className='backups'>
        <Helmet>
          <title>Just some dude.</title>
        </Helmet>
        <h1>
          <a href='mailto:i@always.fail'>
            <Glyphicon glyph='envelope' style={{fontSize: '10em'}}/>
            <br/>
            i@always.fail
          </a>
        </h1>
      </div>
    );
  }
}

export default Me;
