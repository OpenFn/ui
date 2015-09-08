import Reflux from "reflux";

import MappingActions from "../actions/MappingActions";
import SubmissionActions from "../actions/SubmissionActions";

import MappingClient from "../api/Mappings";
import SubmissionClient from "../api/SubmissionClient";

export default Reflux.createStore({
  listenables: [MappingActions, SubmissionActions],

  onRequestSubmissions: function(mappingId) {

    MappingClient.get(mappingId).then((response) => {

      this.mapping = response;

      this.trigger({
        mapping: ( this.mapping || null ),
        submissions: ( this.submissions || [] )
      });

    });

    // TODO: don't send the body!
    SubmissionClient.index({mappingId: mappingId}).then((response) => {
      this.submissions = response;

      this.trigger({
        mapping: ( this.mapping || null ),
        submissions: ( this.submissions || [] )
      });

    });
  },

  onCreateSubmission: function({mapping, body}) {
    SubmissionClient.create({
      mappingId: mapping.id,
      body: body
    }).then(function(res) {
      console.log(res);
    });
  },

  // TODO: respond to new submission
  onSubmissionAdded: function(submission) {
    // this.submissions.push(submission)
  }
});
