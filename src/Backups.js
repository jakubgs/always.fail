import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {Table} from 'react-bootstrap';
import software from './data/software.json';
import backups from './data/backups.json';
import logo from './images/backup.png';

class Backups extends Component {
  mapToRows (entries) {
    return entries.map(entry => 
      <tr>
        <td><a href="{entry.link}">{entry.name}</a></td>
        <td>{entry.pros}</td>
        <td>{entry.cons}</td>
        <td>{entry.cost}</td>
      </tr>
    )
  }

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
        <Table responsive>
          <thead>
            <tr>
              <th>Service</th>
              <th>Pros</th>
              <th>Cons</th>
              <th>Price</th>
            </tr>
          </thead>
          <thead><tr><th colspan="4">Software</th></tr></thead>
          <tbody>
            {this.mapToRows(software)}
          </tbody>
          <thead><tr><th colspan="4">Cloud Storage</th></tr></thead>
          <tbody>
            {this.mapToRows(backups)}
          </tbody>
        </Table>
        <span>
          Feel free to write with any suggestions on what I can add here.
        </span>
      </div>
    );
  }
}

export default Backups;
