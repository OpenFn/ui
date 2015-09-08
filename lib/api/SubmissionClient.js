import request from 'superagent';

const BASEURL = 'http://localhost:9393'

export default class SubmissionClient {
  constructor (arg) {
    // init
  }
  
  static create({mappingId, ...submission}) {

    return new Promise(function(resolve,reject) {
      request
        .post(`${BASEURL}/mappings/${mappingId}/submissions`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(submission)
        .end(function(err, res){
          resolve(res.headers.location);
        });
      })
  }

  static index({mappingId}) {

    return new Promise(function(resolve,reject) {
      request
      .get(`${BASEURL}/mappings/${mappingId}/submissions`)
      .set('Accept', 'application/json')
      .end(function(err, res){
        resolve(res.body);
      });
    })

  }

  static get({ id }) {
    
    return new Promise(function(resolve,reject) {
      request
      .get(`${BASEURL}/submissions/${id}`)
      .set('Accept', 'application/json')
      .end(function(err, res){
        resolve(res.body);
      });
    })

  }
  
}


