import React, { Component, PropTypes } from 'react';

export default class MappingList extends Component {
  render() {
    return (
      <ul>
        {this.props.mappings.map(({title}, index) =>
           <li key={index}>{title}</li>
        )}
      </ul>
    );
  }
}

MappingList.propTypes = {
  mappings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
