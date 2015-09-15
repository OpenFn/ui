import React from "react";
import Reflux from "reflux";

import MappingActions from "../actions/MappingActions";
import MappingClient from "../api/Mappings";

export default Reflux.createStore({
  listenables: [MappingActions],
  onRequestMapping: function(id) {
    MappingClient.get(id).then((response) => {
      this.mapping = response;
      this.trigger({mapping: this.mapping});
    });
  },

  onReplaceTransform: function({transform}) {
    console.log("onReplaceTransform");
    this.transform = transform;
    this.trigger({transform: transform, mapping: this.mapping});
  },

  onSaveMapping: function(mapping) {
    MappingClient.save(mapping).then((response) => {
      MappingActions.mappingSaved(mapping);
    });
  },

  onMappingSaved: function(mapping) {
    console.log("onMappingSaved");
  }

  
  // updateTransform: function(nextTransform) {
  //   let transform = this.transform || {}
  //   let newData = React.addons.update(transform, { $merge: nextTransform });
  //   this.transform = transform;
  //   this.trigger({transform})
  // }
});
