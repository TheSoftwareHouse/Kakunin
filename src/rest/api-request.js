import fetch from 'node-fetch';

class ApiRequest {
  constructor() {
    this.method = null;
    this.endpoint = null;
    this.payload = null;
    this.headers = new fetch.Headers();
  }

  addHeaders(headers) {
    for (const [key, value] of Object.entries(headers)) {
      this.headers.append(key, value);
    }
  }

  get body() {
    return this.payload;
  }

  set body(payload) {
    this.payload = payload ? JSON.stringify(payload) : undefined;
  }
}

module.exports = ApiRequest;
