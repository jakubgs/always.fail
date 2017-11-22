import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import commies from './images/commies.gif';

class Commies extends Component {
  render () {
    return (
      <div className='commies'>
        <Helmet>
          <title>Just stop.</title>
        </Helmet>
        <img src={commies} alt="Just stop."/>
      </div>
    );
  }
}

export default Commies;
