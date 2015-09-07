import "bootstrap/css/bootstrap.css!"
import React from 'react';
import { RouterMixin, navigate } from 'react-mini-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Button } from 'react-bootstrap';

import Reflux from 'reflux';

let MappingActions = Reflux.createActions([
  "newMapping"
]);

let MappingStore = Reflux.createStore({
  listenables: [MappingActions],
  onNewMapping: function(payload) {
    navigate('/mapping/10');
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
  }

  handleClick() {
    console.log(arguments);
    MappingActions.newMapping();
  }

  render() {
return <div>
  <h1>Mappings</h1>
  <Button bsStyle='primary' onClick={this.handleClick}>New</Button>
</div>;
  }
}

class MappingView extends React.Component {
  render() {
    return <div><h1>Mapping#{this.props.mappingId}</h1></div>;
  }
}

React.render(<App />, document.body);

