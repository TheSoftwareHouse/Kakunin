import { defineSupportCode } from 'cucumber';
import config from '../core/config.helper';
import RestApiService from '../rest/rest-api-service.js';

const service = new RestApiService(config.apiUrl);

defineSupportCode(function({ When, Then }) {
  let fetchResult;

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint$/, function(method, endpoint) {
    return service.fetch(method, endpoint).then(response => {
      fetchResult = response;
      return response;
    });
  });

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint with body:$/, function(method, endpoint, payload) {
    return service.fetch(method, endpoint, JSON.parse(payload)).then(response => {
      return fetchResult = response;
    });
  });

  Then(/^the response code should be "([^"]*)"$/, function(status) {
    return expect(fetchResult.hasStatus(parseInt(status))).to.be.true;
  });

  Then(/^the response should exact match to body:$/, function(body) {
    return expect(fetchResult.hasBodyMatch(JSON.parse(body))).to.be.true;
  });

  Then(/^the response should match JSON schema:$/, function(schema) {
    try {
      fetchResult.hasMatchingSchema(JSON.parse(schema));
    } catch (error) {
      return Promise.reject(error);
    }
  });
});
