import { Headers } from 'node-fetch';
import FormData = require('form-data');

export class ApiRequest {
  public method: string;
  public endpoint: string;
  private payload: any;
  private headers: any;
  private formData: any;

  constructor() {
    this.payload = null;
    this.headers = new Headers();
    this.formData = new FormData();
  }

  public addHeaders(headers) {
    for (const [key, value] of Object.entries(headers)) {
      this.headers.append(key, value);
    }
  }

  public addFormData(payload) {
    for (const table of payload) {
      this.formData.append(table[0], table[1]);
    }
    return this.formData;
  }

  get body() {
    return this.payload;
  }

  set body(payload) {
    if (payload instanceof FormData) {
      this.payload = payload;
    } else {
      this.payload = payload ? JSON.stringify(payload) : undefined;
    }
  }
}
