import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  children: PropTypes.node
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select() {
  return { };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);

