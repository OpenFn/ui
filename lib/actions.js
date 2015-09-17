import 'isomorphic-fetch';

export const REQUEST_MAPPINGS = 'REQUEST_MAPPINGS';
export function requestMappings() {
  return { type: REQUEST_MAPPINGS };
}

export const RECEIVE_MAPPINGS = 'RECEIVE_MAPPINGS';
export function receiveMappings(json) {
  return { type: RECEIVE_MAPPINGS, mappings: json };
}

export function fetchMappings() {
  return (dispatch) => {
    dispatch(requestMappings());

    return fetch(`http://127.0.0.1:9393/mappings`,{
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveMappings(json)));
    
  }
};


