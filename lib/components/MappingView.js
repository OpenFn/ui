import React from 'react';
import { Grid, Row, Col, Tabs, Tab, Button, Input } from 'react-bootstrap';

import SpecUploader from './SpecUploader';


import MappingActions from '../actions/MappingActions';
import MappingViewStore from '../stores/MappingViewStore';

let MappingView = React.createClass({

  getInitialState: function() {
    return { 
      mapping: null,
      transform: {}
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
    this.setState(mapping);
  },

  handleNewTransform: function(content) {
    MappingActions.replaceTransform({transform: {spec:content}});
  },

  handleSaveClick: function() {
    MappingActions.saveMapping(this.state.mapping);
  },

  render: function() {
    let mapping = this.state.mapping
    if (mapping) {
      return (
        <Grid>
          <h1>{mapping.title}</h1>

          <Row className='show-grid'>
            <Col xs={12} md={6}>
              <SpecUploader onReceive={this.handleNewTransform} />
            </Col>
            <Col xs={12} md={6}>
              <Button onClick={this.handleSaveClick}>
                Save
              </Button>
            </Col>
          </Row> 
          <Row className='show-grid'>
            <Col xs={12} md={12}>
              <pre>{this.state.transform.spec}</pre>
            </Col>
          </Row> 
        </Grid>
      );
    } else {
      return <div></div>;
    }
  }
  
});

export default MappingView;
