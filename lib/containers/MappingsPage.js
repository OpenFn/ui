import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchMappings } from '../actions';

class MappingsPage extends Component {

  constructor(props) {
    super(props);
    this.renderMappingItem = this.renderMappingItem.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchMappings();
  }

  componentWillReceiveProps(nextProps) {
    // For when you want to upload the list...
    // if (nextProps.whatever !== this.props.whatever) {
    //   loadData(nextProps);
    // }
  }

  renderMappingItem(mapping) {
    return (
      <Link to={`/mappings/${mapping.id}`}>
        <li key={mapping.id}>{mapping.title}</li>
      </Link>
    );
  }

  render() {
    const { mappings } = this.props;
    // if (!repo || !owner) {
    //   return <h1><i>Loading {name} details...</i></h1>;
    // }

    return (
      <div>
        <h1>Mappings</h1>
        <hr />
        <ul>
          {mappings.map(this.renderMappingItem)}
        </ul>
      </div>
    );
  }
}

MappingsPage.propTypes = {
  mappings: PropTypes.array.isRequired,
  fetchMappings: PropTypes.func.isRequired
};

MappingsPage.contextTypes = {
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const {
    entities: { mappings }
  } = state;

  return { mappings };
}

export default connect(
  // We attach the fetchMappings action via props
  mapStateToProps, { fetchMappings }
)(MappingsPage);

