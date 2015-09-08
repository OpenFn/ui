import React from 'react';
import { Button,Table } from 'react-bootstrap';

import MappingActions from "../actions/MappingActions";
import MappingListingStore from "../stores/MappingListingStore";

let MappingListing = React.createClass({
  getInitialState: function() {
    return {list: null};
  },
  componentDidMount: function() {
    this.unsubscribe = MappingListingStore.listen(this.onMappingsChange);
    MappingActions.retrieveMappings();
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  onMappingsChange: function(list) {
    this.setState({list: list});
  },
  handleNewMappingClick: function() {
    console.log(arguments);
    MappingActions.newMapping();
  },
  render: function() {
    let list = this.state.list
    let mappings = null
    if (list) { mappings = (  
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            { list.map(function({id,title,created_at}) {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td><a href={`/mapping/${id}`}>{title}</a></td>
                <td>{created_at}</td>
              </tr>
            )
            })}
          </tbody>
        </Table>
      ) }
    return <div>
      <h1>Mappings</h1>
      <Button bsStyle='primary' onClick={this.handleNewMappingClick}>New</Button>
      {mappings}
    </div>
    }
});
export default MappingListing;
