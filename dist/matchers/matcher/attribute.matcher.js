'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexBuilder = require('./regex-matcher/regex-builder');

var _regexBuilder2 = _interopRequireDefault(_regexBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AttributeMatcher = {
  isSatisfiedBy: function (prefix) {
    return prefix === 'attribute';
  },

  match: function (element, matcherName) {
    const splittedValue = matcherName.split(':');

    return element.getAttribute(splittedValue[1]).then(value => _regexBuilder2.default.buildRegex(`r:${splittedValue[2]}`).test(value));
  }
};

exports.default = AttributeMatcher;