import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import MappingActions from '../actions/MappingActions';
import MappingViewStore from '../stores/MappingViewStore';

let MappingView = React.createClass({

  getInitialState: function() {
    return { 
      mapping: ( this.mapping || null ),
      tabKey: 1
    }
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

  handleSelect: function(tabKey, a,b) {
    this.setState({tabKey});
  },

  render: function() {
    let mapping = this.state.mapping
    if (mapping) {
      return (
        <div>
          <h1>{mapping.title}</h1>
          <Tabs activeKey={this.state.tabKey} onSelect={this.handleSelect}>
            <Tab eventKey={1} title='Transform'>Tab 1 content</Tab>
            <Tab eventKey={2} title='Submissions' disabled>Tab 2 content</Tab>
            <Tab eventKey={3} title='Destination' disabled>Tab 3 content</Tab>
          </Tabs>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  
});

export default MappingView;
