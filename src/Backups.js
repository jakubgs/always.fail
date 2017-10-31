import React, { Component } from 'react';
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
    return (
      <div className="backups">
        <img src={logo} className="logo" alt="backup icon"/>
        <h1>All storage eventually fails</h1>
        <span>
          To fight against that use multiple storage mediums,
          and if possible, <b>multiple</b> off-site backups.
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
      </div>
    );
  }
}

export default Backups;
