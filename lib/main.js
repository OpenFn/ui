import "bootstrap/css/bootstrap.css!"
import React from 'react';
import { RouterMixin, navigate } from 'react-mini-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Button,Table } from 'react-bootstrap';

import Reflux from 'reflux';

import MappingClient from './api/mappings';
window.$a = MappingClient;

let MappingActions = Reflux.createActions([
  "newMapping", "retrieveMappings", "requestMapping"
]);


class Menu extends React.Component {
  render() {
    return (
      <Navbar brand='UADT' inverse staticTop toggleNavKey={0}>
        <Nav>
          <NavItem eventKey={1} href='#/'>Mappings</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const App = React.createClass({

    mixins: [RouterMixin],

    routes: {
      '/': 'mappingListing',
      '/mappings': 'mappingListing',
      '/mapping/:mappingId': 'mappingView'
    },

    render: function() {
      return (
        <div>
          <Menu/>
          <div className="container">{this.renderCurrentRoute()}</div>
        </div>
      );
    },

    home: function() {
      return <div>Hello World</div>;
    },

    mappingListing: function() {
      return <MappingListing />;
    },

    mappingView: function(mappingId) {
      return <MappingView mappingId={mappingId} />;
    },

    notFound: function(path) {
      return <div class="not-found">Page Not Found: {path}</div>;
    }

});

let MappingListingStore = Reflux.createStore({
  listenables: [MappingActions],
  onRetrieveMappings: function(payload) {
    MappingClient.index().then((list) => {
      this.list = list;
      this.trigger(list);
    });
  },
  onNewMapping: function(payload) {
    MappingClient.create({title: "Untitled"}).then(function() {
      navigate('/mapping/10');
    });
  }
})

const MappingListing = React.createClass({
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
                <td>{title}</td>
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


let MappingViewStore = Reflux.createStore({
  listenables: [MappingActions],
  onRequestMapping: function(id) {
    MappingClient.get(id).then((response) => {
      this.mapping = response;
      this.trigger(response);
    });
  }
});

const MappingView = React.createClass({

  getInitialState: function() {
    return { mapping: null };
  },

  componentDidMount: function() {
    this.unsubscribe = MappingViewStore.listen(this.onMappingChange);
    MappingActions.requestMapping(this.props.mappingId); 
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  componentWillReceiveProps: function(nextProps) {
    MappingActions.requestMapping(nextProps.mappingId); 
  },

  onMappingChange: function(mapping) {
    console.log(mapping);
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


React.render(<App />, document.body);

