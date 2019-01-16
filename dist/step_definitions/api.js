'use strict';

var _cucumber = require('cucumber');

var _config = require('../core/config.helper');

var _config2 = _interopRequireDefault(_config);

var _restApiService = require('../REST/rest-api-service.js');

var _restApiService2 = _interopRequireDefault(_restApiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const service = new _restApiService2.default(_config2.default.apiUrl);

(0, _cucumber.defineSupportCode)(function ({ When, Then }) {
  let fetchResult;

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint$/, function (method, endpoint) {
    // eslint-disable-next-line no-return-assign
    return service.fetch(method, endpoint).then(response => fetchResult = response);
  });

  Then(/^the response code should be "([^"]*)"$/, function (status) {
    return expect(fetchResult.hasStatus(parseInt(status))).to.be.true;
  });

  Then(/^the response should exact match to body:$/, function (body) {
    return expect(fetchResult.hasBodyMatch(JSON.parse(body))).to.be.true;
  });
});