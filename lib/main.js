import React from 'react';

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

React.render(<HelloMessage name="World!" />, document.body);
