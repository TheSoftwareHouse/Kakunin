import fetch from 'node-fetch';
import ApiResponse from './api-response.js';

class RestApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  resolveUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }

  fetch(request) {
    const url = this.resolveUrl(request.endpoint);

    return fetch(url, { method: request.method, body: request.body, headers: request.headers }).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.startsWith('application/json')) {
        return response.json().then(requestBody => {
          return new ApiResponse(response.status, requestBody, response.headers);
        });
      }
      return new ApiResponse(response.status, {});
    });
  }
}

module.exports = RestApiService;
