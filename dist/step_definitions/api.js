"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const config_helper_1 = require("../core/config.helper");
const rest_api_service_1 = require("../rest/rest-api-service");
const api_request_1 = require("../rest/api-request");
const service = new rest_api_service_1.RestApiService(config_helper_1.default.apiUrl);
let apiRequest = new api_request_1.ApiRequest();
cucumber_1.defineSupportCode(function ({ When, Then }) {
    let fetchResult;
    When(/^I send "([^"]*)" request on "([^"]*)" endpoint$/, function (method, endpoint) {
        apiRequest.method = method;
        apiRequest.endpoint = endpoint;
        return service
            .fetch(apiRequest)
            .then(response => {
            fetchResult = response;
            return response;
        })
            .finally(() => {
            apiRequest = new api_request_1.ApiRequest();
            return apiRequest;
        });
    });
    When(/^I send "([^"]*)" request on "([^"]*)" endpoint with JSON body:$/, function (method, endpoint, payload) {
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
            apiRequest = new api_request_1.ApiRequest();
            return apiRequest;
        });
    });
    When(/^I set request headers:$/, function (headers) {
        return apiRequest.addHeaders(headers.rowsHash());
    });
    Then(/^the response code should be "([^"]*)"$/, function (status) {
        return expect(fetchResult.hasStatus(parseInt(status))).toBe(true);
    });
    Then(/^the response should exact match to body:$/, function (body) {
        return expect(fetchResult.hasBodyMatch(JSON.parse(body))).toBe(true);
    });
    Then(/^the response should match JSON schema:$/, function (schema) {
        try {
            fetchResult.hasMatchingSchema(JSON.parse(schema));
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
});
