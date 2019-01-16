import _ from 'lodash';

class ApiResponse {
  constructor(responseStatus, body) {
    this.body = body;
    this.status = responseStatus;
  }

  hasStatus(status) {
    return this.status === status;
  }

  hasBodyMatch(body) {
    return _.isEqual(this.body, body);
  }
}

module.exports = ApiResponse;
