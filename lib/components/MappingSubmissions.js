import React from 'react';

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
    this.setState({submissions: submissions});
  },

  render: function() {
    let submissions = this.state.mapping.map(function({id,date_created}) {
      return {};
    });

    if (submissions.length > 0) {
      return ( <div>
        <h1>{mapping.title}</h1>
      </div> );
    } else {
      return <div></div>;
    }
  }
  
});

export default MappingSubmissions;
