import "bootstrap/css/bootstrap.css!"
import React from 'react';
import { RouterMixin, navigate } from 'react-mini-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Button,Table } from 'react-bootstrap';

import Menu from "./components/Menu";

import MappingView from "./components/MappingView";
import MappingListing from "./components/MappingListing";

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



React.render(<App />, document.body);

