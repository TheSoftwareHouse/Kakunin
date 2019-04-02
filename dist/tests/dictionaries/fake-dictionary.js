"use strict";
const base_1 = require("../../dictionaries/base");
class FakeDictionary extends base_1.default {
    constructor() {
        super('fake-dictionary', {
            'some-key': 'some-value',
        });
    }
}
module.exports = new FakeDictionary();
