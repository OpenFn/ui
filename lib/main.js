import "bootstrap/css/bootstrap.css!"
import React from 'react';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

class Menu extends React.Component {
  render() {
    return (
      <Navbar brand='UADT' inverse toggleNavKey={0}>
      </Navbar>
    );
  }
}

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

let page = (
<div>
  <Menu/>
  <div className="container">
    <HelloMessage name="world!"/>
  </div>
</div>
);

React.render(page, document.body);
