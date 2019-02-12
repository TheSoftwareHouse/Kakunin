import * as _ from 'lodash';
import * as Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

export class ApiResponse {
  private readonly body: object;
  private readonly status: number;

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
      throw Error('Response doesnt match schema');
    }
  }
}
