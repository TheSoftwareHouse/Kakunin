import { defineSupportCode } from 'cucumber';
import config from '../core/config.helper';
import RestApiService = require('../rest/rest-api-service.js');

const service = new RestApiService(config.apiUrl);

defineSupportCode(({ When, Then }) => {
  let fetchResult;

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint$/, (method, endpoint) => {
    return service.fetch(method, endpoint).then(response => (fetchResult = response));
  });

  Then(/^the response code should be "([^"]*)"$/, status => {
    return expect(fetchResult.hasStatus(parseInt(status))).toBe(true);
  });

  Then(/^the response should exact match to body:$/, body => {
    return expect(fetchResult.hasBodyMatch(JSON.parse(body))).toBe(true);
  });
});
