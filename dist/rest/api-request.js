'use strict';

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiRequest {
  constructor() {
    this.method = null;
    this.endpoint = null;
    this.payload = null;
    this.headers = new _nodeFetch2.default.Headers();
  }

  addHeaders(headers) {
    for (const [key, value] of Object.entries(headers)) {
      this.headers.append(key, value);
    }
  }

  get body() {
    return this.payload;
  }

  set body(payload) {
    this.payload = payload ? JSON.stringify(payload) : undefined;
  }
}

module.exports = ApiRequest;