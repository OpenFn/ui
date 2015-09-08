import React from 'react';

import MappingActions from '../actions/MappingActions';
import MappingViewStore from '../stores/MappingViewStore';

let MappingView = React.createClass({

  getInitialState: function() {
    return MappingViewStore.getInitialState();
  },

  componentWillMount: function() {
    MappingActions.requestMapping(this.props.mappingId); 
  },

  componentDidMount: function() {
    this.unsubscribe = MappingViewStore.listen(this.onMappingChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.mappingId != this.props.mappingId) {
      MappingActions.requestMapping(nextProps.mappingId); 
    }
  },

  onMappingChange: function(mapping) {
    this.setState({mapping: mapping});
  },

  render: function() {
    let mapping = this.state.mapping
    if (mapping) {
      return ( <div>
        <h1>{mapping.title}</h1>
      </div> );
    } else {
      return <div></div>;
    }
  }
  
});

export default MappingView;
