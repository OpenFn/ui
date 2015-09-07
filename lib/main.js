import "bootstrap/css/bootstrap.css!"
import React from 'react';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Button } from 'react-bootstrap';

import Reflux from 'reflux';

let MappingActions = Reflux.createActions([
  "newMapping"
]);

let MappingStore = Reflux.createStore({
  listenables: [MappingActions],
  onNewMapping: function() {
    console.log('onNewMapping called!');
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

class App extends React.Component {
  render() {
    return (
      <div>
        <Menu/>
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    );
  }
}

class MappingsListHandler extends React.Component {

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

class MappingViewHandler extends React.Component {
  render() {
    return <div><h1>Mapping#{this.props.params.mappingId}</h1></div>;
  }
}


let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HelloMessage} />
    <Route name="mappings" handler={MappingsListHandler} />
    <Route name="mapping" path="/mapping/:mappingId" handler={MappingViewHandler} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

