'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attributeMatcher = undefined;

var _regexBuilder = require('./regex-matcher/regex-builder');

class AttributeMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 'attribute';
  }

  match(element, attributeName, regexName) {
    return element.getAttribute(attributeName).then(value => _regexBuilder.regexBuilder.buildRegex(`r:${regexName}`).test(value));
  }
}

const attributeMatcher = exports.attributeMatcher = new AttributeMatcher();