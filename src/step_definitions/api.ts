import { defineSupportCode } from 'cucumber';
import config from '../core/config.helper';
import { RestApiService } from '../rest/rest-api-service';
import { ApiRequest } from '../rest/api-request';

const service = new RestApiService(config.apiUrl);
let apiRequest = new ApiRequest();

defineSupportCode(({ When, Then }) => {
  let fetchResult;

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint$/, (method, endpoint) => {
    apiRequest.method = method;
    apiRequest.endpoint = endpoint;
    return service
      .fetch(apiRequest)
      .then(response => {
        fetchResult = response;
        return response;
      })
      .finally(() => {
        apiRequest = new ApiRequest();
        return apiRequest;
      });
  });

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint with JSON body:$/, (method, endpoint, payload) => {
    apiRequest.method = method;
    apiRequest.endpoint = endpoint;
    apiRequest.body = JSON.parse(payload);
    apiRequest.addHeaders({ 'Content-Type': 'application/json' });

    return service
      .fetch(apiRequest)
      .then(response => {
        fetchResult = response;
        return response;
      })
      .finally(() => {
        apiRequest = new ApiRequest();
        return apiRequest;
      });
  });

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint using form data:$/, (method, endpoint, payload) => {
    apiRequest.method = method;
    apiRequest.endpoint = endpoint;
    apiRequest.body = apiRequest.addFormData(payload.raw());

    return service
      .fetch(apiRequest)
      .then(response => {
        fetchResult = response;
        return response;
      })
      .finally(() => {
        apiRequest = new ApiRequest();
        return apiRequest;
      });
  });

  When(/^I set request headers:$/, headers => {
    return apiRequest.addHeaders(headers.rowsHash());
  });

  Then(/^the response code should be "([^"]*)"$/, status => {
    return expect(fetchResult.hasStatus(parseInt(status))).toBe(true);
  });

  Then(/^the response should exact match to body:$/, body => {
    return expect(fetchResult.hasBodyMatch(JSON.parse(body))).toBe(true);
  });

  Then(/^the response should match JSON schema:$/, schema => {
    try {
      fetchResult.hasMatchingSchema(JSON.parse(schema));
    } catch (error) {
      return Promise.reject(error);
    }
  });
});
