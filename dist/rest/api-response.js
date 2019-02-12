"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
class ApiResponse {
    constructor(responseStatus, body) {
        this.body = body;
        this.status = responseStatus;
    }
    hasStatus(status) {
        return this.status === status;
    }
    hasBodyMatch(body) {
        if (Object.keys(this.body).length === 0) {
            return Error('Response from server was empty');
        }
        return _.isEqual(this.body, body);
    }
    hasMatchingSchema(schema) {
        const test = ajv.compile(schema);
        const isValid = test(this.body);
        if (isValid === false) {
            throw Error('Response doesnt match schema');
        }
    }
}
exports.ApiResponse = ApiResponse;
