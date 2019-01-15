'use strict';

const fetch = require('node-fetch');
const ApiResponse = require('../rest/apiResponse.js');

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetchFunction(method, endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, { method }).then(response => {
      return response.json().then(body => {
        return new ApiResponse(response.status, body);
      });
    });
  }
}

module.exports = RestApiService;