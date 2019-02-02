import * as _ from 'lodash';
import * as Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });


class ApiResponse {
  private readonly status: string;
  private readonly body: any;

  constructor(responseStatus, body) {
    this.body = body;
    this.status = responseStatus;
  }

  public hasStatus(status) {
    return this.status === status;
  }

  public hasBodyMatch(body) {
    if (Object.keys(this.body).length === 0) {
      return Error('Response from server was empty');
    }
    return _.isEqual(this.body, body);
  }

  public hasMatchingSchema(schema) {
    const test = ajv.compile(schema);
    const isValid = test(this.body);

    if (isValid === false) {
      throw 'Response doesnt match schema';
    }
  }
}

export = ApiResponse;
