import fetch from 'node-fetch';
import ApiResponse from './api-response.js';

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetch(method, endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, { method }).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType.startsWith('application/json')) {
        return response.json().then(body => {
          return new ApiResponse(response.status, body);
        });
      }
      return new ApiResponse(response.status, {});
    });
  }
}

module.exports = RestApiService;
