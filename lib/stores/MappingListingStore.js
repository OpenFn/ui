import Reflux from "reflux";
import { navigate } from 'react-mini-router';

import MappingActions from "../actions/MappingActions";
import MappingClient from "../api/Mappings";

export default Reflux.createStore({
  listenables: [MappingActions],
  onRetrieveMappings: function(payload) {
    MappingClient.index().then((list) => {
      this.list = list;
      this.trigger(list);
    });
  },
  onNewMapping: function(payload) {
    MappingClient.create({title: "Untitled"}).then(function(location) {
      let id = /(\d+)$/.exec(location)[0];
      navigate(`/mapping/${id}`);
    });
  }
});
