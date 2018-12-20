'use strict';

var _cucumber = require('cucumber');

var _config = require('../core/config.helper');

var _config2 = _interopRequireDefault(_config);

var _restApiService = require('../rest/rest-api-service.js');

var _restApiService2 = _interopRequireDefault(_restApiService);

var _apiRequest = require('../rest/api-request');

var _apiRequest2 = _interopRequireDefault(_apiRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const service = new _restApiService2.default(_config2.default.apiUrl);
let apiRequest = new _apiRequest2.default();

(0, _cucumber.defineSupportCode)(function ({ When, Then }) {
  let fetchResult;

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint$/, function (method, endpoint) {
    apiRequest.method = method;
    apiRequest.endpoint = endpoint;
    return service.fetch(apiRequest).then(response => {
      fetchResult = response;
      return response;
    }).finally(() => {
      apiRequest = new _apiRequest2.default();
      return apiRequest;
    });
  });

  When(/^I send "([^"]*)" request on "([^"]*)" endpoint with JSON body:$/, function (method, endpoint, payload) {
    apiRequest.method = method;
    apiRequest.endpoint = endpoint;
    apiRequest.body = JSON.parse(payload);
    apiRequest.addHeaders({ 'Content-Type': 'application/json' });

    return service.fetch(apiRequest).then(response => {
      fetchResult = response;
      return response;
    }).finally(() => {
      apiRequest = new _apiRequest2.default();
      return apiRequest;
    });
  });

  When(/^I set request headers:$/, function (headers) {
    return apiRequest.addHeaders(headers.rowsHash());
  });

  Then(/^the response code should be "([^"]*)"$/, function (status) {
    return expect(fetchResult.hasStatus(parseInt(status))).to.be.true;
  });

  Then(/^the response should exact match to body:$/, function (body) {
    return expect(fetchResult.hasBodyMatch(JSON.parse(body))).to.be.true;
  });

  Then(/^the response should match JSON schema:$/, function (schema) {
    try {
      fetchResult.hasMatchingSchema(JSON.parse(schema));
    } catch (error) {
      return Promise.reject(error);
    }
  });
});