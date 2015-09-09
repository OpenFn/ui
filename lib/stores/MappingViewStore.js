import Reflux from "reflux";

import MappingActions from "../actions/MappingActions";
import MappingClient from "../api/Mappings";

export default Reflux.createStore({
  listenables: [MappingActions],
  onRequestMapping: function(id) {
    MappingClient.get(id).then((response) => {
      this.mapping = response;
      this.trigger(response);
    });
  }
});
