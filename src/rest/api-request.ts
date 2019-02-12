import { Headers } from 'node-fetch';

export class ApiRequest {
  public method: string;
  public endpoint: string;
  private payload: string;
  private headers: any;

  constructor() {
    this.payload = null;
    this.headers = new Headers();
  }

  public addHeaders(headers) {
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
