import { combineReducers } from 'redux';
import { REQUEST_MAPPINGS, RECEIVE_MAPPINGS } from './actions';

function entities(state = {
  mappings: []
}, action) {

  switch (action.type) {
  case RECEIVE_MAPPINGS:
    return Object.assign({},state,{
      mappings: action.mappings
    });

  default:
    return state;
  }
}

const rootReducer = combineReducers({
  entities
})

export default rootReducer;

