import "bootstrap/css/bootstrap.css!"
import React from 'react';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

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


let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HelloMessage} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

