import React from 'react';
import { Navbar,Nav,NavItem } from 'react-bootstrap';

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

export default Menu;
