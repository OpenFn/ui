import request from 'superagent';

const BASEURL = 'http://localhost:9393'

export default class SubmissionClient {
  constructor (arg) {
    // init
  }
  
  static create(obj) {

    return new Promise(function(resolve,reject) {
      request
        .post(BASEURL + '/mappings')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(obj)
        .end(function(err, res){
          resolve(res.headers.location);
        });
      })
  }

  static index() {

    return new Promise(function(resolve,reject) {
      request
      .get(BASEURL + '/mappings')
      .set('Accept', 'application/json')
      .end(function(err, res){
        resolve(res.body);
      });
    })

  }

  static get(mappingId) {
    
    return new Promise(function(resolve,reject) {
      request
      .get(BASEURL + '/mappings/' + mappingId)
      .set('Accept', 'application/json')
      .end(function(err, res){
        resolve(res.body);
      });
    })

  }
  
}


