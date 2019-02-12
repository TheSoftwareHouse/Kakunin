"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const api_response_1 = require("./api-response");
class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    fetch(request) {
        const url = this.resolveUrl(request.endpoint);
        return node_fetch_1.default(url, { method: request.method, body: request.body, headers: request.headers }).then(response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('application/json')) {
                return response.json().then(requestBody => {
                    return new api_response_1.ApiResponse(response.status, requestBody);
                });
            }
            return new api_response_1.ApiResponse(response.status, {});
        });
    }
    resolveUrl(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }
}
exports.RestApiService = RestApiService;
