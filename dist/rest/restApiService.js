'use strict';

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _apiResponse = require('../rest/apiResponse.js');

var _apiResponse2 = _interopRequireDefault(_apiResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetch(method, endpoint) {
    return (0, _nodeFetch2.default)(`${this.baseUrl}${endpoint}`, { method }).then(response => {
      return response.json().then(body => {
        return new _apiResponse2.default(response.status, body);
      }).catch(error => console.log(error));
    });
  }
}

module.exports = RestApiService;