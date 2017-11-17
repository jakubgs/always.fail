import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import software from './data/software.json';
import backups from './data/backups.json';

class BackupsTable extends Component {
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
    );
  }
}

export default BackupsTable;
