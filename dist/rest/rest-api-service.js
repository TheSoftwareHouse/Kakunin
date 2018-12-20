'use strict';

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _apiResponse = require('./api-response.js');

var _apiResponse2 = _interopRequireDefault(_apiResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  resolveUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }

  fetch(request) {
    const url = this.resolveUrl(request.endpoint);

    return (0, _nodeFetch2.default)(url, { method: request.method, body: request.body, headers: request.headers }).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.startsWith('application/json')) {
        return response.json().then(requestBody => {
          return new _apiResponse2.default(response.status, requestBody, response.headers);
        });
      }
      return new _apiResponse2.default(response.status, {});
    });
  }
}

module.exports = RestApiService;