import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class MappingViewPage extends Component {

  render() {
    const { title } = this.props;
    // if (!repo || !owner) {
    //   return <h1><i>Loading {name} details...</i></h1>;
    // }

    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}

MappingViewPage.propTypes = {
  // React Router provides 'params' as props.
  params: PropTypes.shape({
    // This component explicitly requires the 'mappingId'
    // from params so we can load the mapping
    mappingId: PropTypes.string.isRequired
  }).isRequired,

  title: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  const { mappingId } = ownProps.params;
  // We pick out mappings from state.entities.
  const {
    entities: { mappings }
  } = state;

  // And then unpack the title.
  const { title } = mappings[0]

  // And return the title and mappingId
  // Which gets sent to the component as props.
  return { title, mappingId };
}

export default connect(
  mapStateToProps
)(MappingViewPage);

