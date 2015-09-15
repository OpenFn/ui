import React from 'react';
import { ButtonInput, Input } from 'react-bootstrap';

let SpecUploader = React.createClass({

  receiveFile: function({file}) {

    let reader = new FileReader();
    reader.onload = () => {
      this.props.onReceive(reader.result)
    }
    reader.readAsText(file);
  },

  handleFileSelection: function(e) {
    let file = e.target.files[0];
    this.receiveFile({file: file});
  },

  // Open the file selection window.
  handleClick: function(e) {
    this.refs.specFileInput.getInputDOMNode().click();
  },

  render: function() {
    return (
      <div>
        <Input type='file'
          ref='specFileInput'
          className='hidden'
          onChange={this.handleFileSelection} />

        <ButtonInput onClick={this.handleClick}
          value="Upload Transform" />
      </div>
    )
  }
});

export default SpecUploader;
