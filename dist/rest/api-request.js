"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const FormData = require("form-data");
class ApiRequest {
    constructor() {
        this.payload = null;
        this.headers = new node_fetch_1.Headers();
        this.formData = new FormData();
    }
    addHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.headers.append(key, value);
        }
    }
    addFormData(payload) {
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
        }
        else {
            this.payload = payload ? JSON.stringify(payload) : undefined;
        }
    }
}
exports.ApiRequest = ApiRequest;
