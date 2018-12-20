import { defineSupportCode } from 'cucumber';

const RestApiService = require('../REST/restApiService.js');
const service = new RestApiService('https://swapi.co/api');

defineSupportCode(function({ When, Then }) {
  When(/^When I send "([^"]*)" request on "([^"]*)" endpoint$/, function (method, endpoint) {
    return service.fetchFunction(method, endpoint);
  });

  Then(/^The response code should be "([^"]*)"$/, function (status) {
    return service.responseStatus(status);
  });

  Then(/^Then the response should be "([^"]*)" with body:/, function (status, body) {
    return service.responseStatus(status)
      .then(() => service.JSONExactMatch(body));
  });
});
