import Reflux from "reflux";

import MappingActions from "../actions/MappingActions";
import MappingClient from "../api/Mappings";
import SubmissionClient from "../api/SubmissionClient";

export default Reflux.createStore({
  listenables: [MappingActions],
  onRequestSubmissions: function(mappingId) {

    MappingClient.get(mappingId).then((response) => {

      this.mapping = response;

      this.trigger({
        mapping: ( this.mapping || null ),
        submissions: ( this.submissions || [] )
      });

    });

    SubmissionClient.index({mappingId: mappingId}).then((response) => {
      this.submissions = response;

      this.trigger({
        mapping: ( this.mapping || null ),
        submissions: ( this.submissions || [] )
      });

    });
  }
});
