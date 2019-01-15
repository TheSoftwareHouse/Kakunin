import { defineSupportCode } from 'cucumber';
import config from '../core/config.helper';
import RestApiService from '../rest/restApiService.js';

const service = new RestApiService(config.apiUrl);

defineSupportCode(function({ When, Then }) {
  let responseResult;

  When(/^When I send "([^"]*)" request on "([^"]*)" endpoint$/, function(method, endpoint) {
    // eslint-disable-next-line no-return-assign
    return service.fetchFunction(method, endpoint).then(response => (responseResult = response));
  });

  Then(/^The response code should be "([^"]*)"$/, function(status) {
    return expect(responseResult.hasStatus(status)).to.be.true;
  });

  Then(/^Then the response should exact match to body:$/, function(body) {
    return expect(responseResult.hasMatch(body)).to.be.true;
  });
});
