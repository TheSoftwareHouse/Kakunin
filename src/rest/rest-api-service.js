import fetch from 'node-fetch';
import ApiResponse from './api-response.js';

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  resolveUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }

  fetch(method, endpoint, payload = false) {
    const url = this.resolveUrl(endpoint);
    const body = payload ? JSON.stringify(payload) : undefined;

    return fetch(url, { method, body, headers: this.headers }).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType.startsWith('application/json')) {
        return response.json().then(responseBody => {
          return new ApiResponse(response.status, responseBody);
        });
      }
      return new ApiResponse(response.status, {});
    });
  }
}

module.exports = RestApiService;
