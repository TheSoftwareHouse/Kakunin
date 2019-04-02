"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const config_helper_1 = require("../core/config.helper");
const rest_api_service_1 = require("../rest/rest-api-service");
const api_request_1 = require("../rest/api-request");
const service = new rest_api_service_1.RestApiService(config_helper_1.default.apiUrl);
let apiRequest = new api_request_1.ApiRequest();
cucumber_1.defineSupportCode(({ When, Then }) => {
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
            apiRequest = new api_request_1.ApiRequest();
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
            apiRequest = new api_request_1.ApiRequest();
            return apiRequest;
        });
    });
    When(/^I send "([^"]*)" request on "([^"]*)" endpoint using form data:$/, (method, endpoint, payload) => {
        apiRequest.method = method;
        apiRequest.endpoint = endpoint;
        apiRequest.body = apiRequest.addFormData(payload.raw());
        apiRequest.addHeaders({ 'Content-Type': 'multipart/form-data' });
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
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
});
