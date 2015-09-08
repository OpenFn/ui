import React from 'react';
import { Button,Table } from 'react-bootstrap';

import MappingActions from '../actions/MappingActions';
import MappingSubmissionsStore from '../stores/MappingSubmissionsStore';

let MappingSubmissions = React.createClass({

  getInitialState: function() {
    return { 
      submissions: [],
      mapping: null
    }
  },

  componentWillMount: function() {
    MappingActions.requestSubmissions(this.props.mappingId); 
  },

  componentDidMount: function() {
    this.unsubscribe = MappingSubmissionsStore.listen(this.onSubmissionsChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.mappingId != this.props.mappingId) {
      MappingActions.requestSubmissions(nextProps.mappingId); 
    }
  },

  onSubmissionsChange: function(submissions) {
    this.setState(submissions);
  },

  render: function() {
    console.log(this.state);
    let mapping = this.state.mapping;
    let submissions = this.state.submissions;

    let submissionRows = submissions.map(function({id,created_at}) {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{created_at}</td>
        </tr>
      )
    });

    let mappingTitle = (mapping ? (<h1>{mapping.title}</h1>) : null);

    return (
      <div>
        {mappingTitle}

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {submissionRows}
          </tbody>
        </Table>
      </div>
    );
  }
  
});

export default MappingSubmissions;
