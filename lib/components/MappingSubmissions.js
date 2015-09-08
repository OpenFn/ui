import React from 'react';
import { Button, ButtonInput,Table,Input } from 'react-bootstrap';

import MappingActions from '../actions/MappingActions';
import SubmissionActions from "../actions/SubmissionActions";

import MappingSubmissionsStore from '../stores/MappingSubmissionsStore';

let MappingSubmissions = React.createClass({

  getInitialState: function() {
    return { 
      submissions: [],
      mapping: null,
      submissionBody: null
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

  handleFileUpload: function() {
    SubmissionActions.createSubmission({
      body: this.state.submissionBody,
      mapping: this.state.mapping
    });
  },

  handleFileChange: function(e) {
    console.log(e.target.value.split(/(\\|\/)/g).pop());
    console.log(e.target.files);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      this.setState({submissionBody: reader.result});
      
    }
    reader.readAsText(file);
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

        <Input type='file' label='File' help='[Optional] help' onChange={this.handleFileChange} />
        <ButtonInput onClick={this.handleFileUpload} type='submit' value='Submit Button' />

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
