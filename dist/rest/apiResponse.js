'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiResponse {
  constructor(responseStatus, body) {
    this.body = body;
    this.status = responseStatus;
  }

  hasStatus(status) {
    return this.status === status;
  }

  hasBodyMatch(body) {
    return _lodash2.default.isEqual(this.body, body);
  }
}

module.exports = ApiResponse;