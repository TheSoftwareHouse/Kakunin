import { Headers } from 'node-fetch';
import FormData = require('form-data');
import fs = require('fs');

interface HeaderList {
  [name: string]: string;
}

export class ApiRequest {
  public method: string;
  public endpoint: string;
  private payload: string | object;
  private headers: Headers;
  private formData: FormData;

  constructor() {
    this.payload = null;
    this.headers = new Headers();
    this.formData = new FormData();
  }

  public addHeaders(headers: HeaderList) {
    for (const [key, value] of Object.entries(headers)) {
      this.headers.append(key, value);
    }
  }

  public addFormData(payload) {
    for (const table of payload) {
      if (table[2].length !== 0) {
        this.formData.append(table[0], fs.createReadStream(table[2]));
      } else {
        this.formData.append(table[0], table[1]);
      }
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
