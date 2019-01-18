import _ from 'lodash';
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

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
    return _.isEqual(this.body, body);
  }

  hasMatchingSchema(schema) {
    const test = ajv.compile(schema);
    const isValid = test(this.body);
    console.log(this.body);
    return isValid ? true : { obj: this.body, error: test.errors };
  }
}

module.exports = ApiResponse;
