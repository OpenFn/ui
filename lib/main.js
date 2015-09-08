import "bootstrap/css/bootstrap.css!"
import React from 'react';
import { RouterMixin, navigate } from 'react-mini-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Button,Table } from 'react-bootstrap';

import Reflux from 'reflux';

import MappingClient from './api/mappings';
window.$a = MappingClient;

let MappingActions = Reflux.createActions([
  "newMapping", "requestMapping"
]);

let MappingListingStore = Reflux.createStore({
  listenables: [MappingActions],
  onNewMapping: function(payload) {
    MappingClient.create({title: "Untitled"}).then(function() {
      navigate('/mapping/10');
    });
  }
})

class Menu extends React.Component {
  render() {
    return (
      <Navbar brand='UADT' inverse staticTop toggleNavKey={0}>
      </Navbar>
    );
  }
}

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
const App = React.createClass({

    mixins: [RouterMixin],

    routes: {
      '/': 'home',
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

class MappingListing extends React.Component {

  constructor(props, context) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {mappings: [{id: 1, title: "yo", created_at: "date!"}]};
  }


  handleClick() {
    console.log(arguments);
    MappingActions.newMapping();
  }

  render() {
return <div>
  <h1>Mappings</h1>
  <Button bsStyle='primary' onClick={this.handleClick}>New</Button>
    <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Date Created</th>
      </tr>
    </thead>
    <tbody>
      {this.state.mappings.map(function({id,title,created_at}) {
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
</div>
  }
}

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

