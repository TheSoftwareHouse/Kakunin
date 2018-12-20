const fetch = require('node-fetch');
const _ = require('lodash');

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.result = null;
    this.schema = null;
  }

  fetchFunction(method, endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, { method })
      .then(response => response.json()
        .then((res) => {
          this.result = {
            status: response.status,
            body: res,
          };
        }));
  }

  responseStatus(status) {
    if (this.result.status === status) {
      return console.log('status is correct ');
    }

    return console.log('wrong status ');
  }

  JSONExactMatch(body) {                  // data from stepDefinition
    return _.isEqual(this.result.body, body);
  }
}

module.exports = RestApiService;
