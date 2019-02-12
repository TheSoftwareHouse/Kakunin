"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
class ApiRequest {
    constructor() {
        this.payload = null;
        this.headers = new node_fetch_1.Headers();
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
exports.ApiRequest = ApiRequest;
