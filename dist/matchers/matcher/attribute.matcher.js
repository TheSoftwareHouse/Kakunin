'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attributeMatcher = undefined;

var _regexBuilder = require('./regex-matcher/regex-builder');

var _regexBuilder2 = _interopRequireDefault(_regexBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AttributeMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 'attribute';
  }

  match(element, attributeName, regexName) {
    return element.getAttribute(attributeName).then(value => _regexBuilder2.default.buildRegex(`r:${regexName}`).test(value));
  }
}

const attributeMatcher = exports.attributeMatcher = new AttributeMatcher();