'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ajv = new _ajv2.default({ allErrors: true });

class ApiResponse {
  constructor(responseStatus, body) {
    this.body = body;
    this.status = responseStatus;
  }

  hasStatus(status) {
    return this.status === status;
  }

  hasBodyMatch(body) {
    if (Object.keys(this.body).length === 0) {
      return Error('Response from server was empty');
    }
    return _lodash2.default.isEqual(this.body, body);
  }

  hasMatchingSchema(schema) {
    const test = ajv.compile(schema);
    const isValid = test(this.body);

    if (isValid === false) {
      throw 'Response doesnt match schema';
    }
  }
}

module.exports = ApiResponse;