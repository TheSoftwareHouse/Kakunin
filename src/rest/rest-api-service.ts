import fetch from 'node-fetch';
import { ApiResponse } from './api-response';

export class RestApiService {
  private readonly baseUrl: string;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  public fetch(request) {
    const url = this.resolveUrl(request.endpoint);

    return fetch(url, { method: request.method, body: request.body, headers: request.headers }).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.startsWith('application/json')) {
        return response.json().then(requestBody => {
          return new ApiResponse(response.status, requestBody);
        });
      }
      return new ApiResponse(response.status, {});
    });
  }

  private resolveUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }
}
