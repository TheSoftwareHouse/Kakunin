import fetch from 'node-fetch';
import ApiResponse = require('./api-response');

class RestApiService {
  private readonly baseUrl: string;
  private headers: { 'Content-Type': string };

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  public resolveUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }

  public fetch(method, endpoint, payload?: string | object) {
    const url = this.resolveUrl(endpoint);
    const body = payload ? JSON.stringify(payload) : undefined;

    return fetch(url, { method, body, headers: this.headers }).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType.startsWith('application/json')) {
        return response.json().then(requestBody => {
          return new ApiResponse(response.status, requestBody);
        });
      }
      return new ApiResponse(response.status, {});
    });
  }
}

export = RestApiService;
