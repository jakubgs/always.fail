import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import logo from './images/backup.png';
import BackupsTable from './BackupsTable.js';

class Backups extends Component {
  render () {
    const subject = "All storage eventually fails";
    return (
      <div className="backups">
        <Helmet>
          <title>{subject}</title>
        </Helmet>
        <img src={logo} className="logo" alt="backup icon"/>
        <h1>{subject}</h1>
        <span>
          To fight against that use multiple storage mediums,
          and if possible, <b>multiple</b> off-site backups.
          There are three rules you have to keep in mind:
          <br/>
          <br/>
          <ul  className='list-unstyled'>
            <li><b>Automate backups</b> - Humans forget, computers dont.</li>
            <li><b>Multiple copies</b> - Disasters happen, drives break.</li>
            <li><b>Check restore</b> - Backups have to work both ways.</li>
          </ul>
          Here are some options you can consider.
        </span>
        <br/><br/>
        <BackupsTable/>
        <span>
          Feel free to write with any suggestions on what I can add here.
        </span>
      </div>
    );
  }
}

export default Backups;
