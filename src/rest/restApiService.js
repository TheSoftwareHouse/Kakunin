import fetch from 'node-fetch';
import ApiResponse from '../rest/apiResponse.js';

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetch(method, endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, { method }).then(response => {
      return response.json().then(body => {
        return new ApiResponse(response.status, body);
      });
    });
  }
}

module.exports = RestApiService;
