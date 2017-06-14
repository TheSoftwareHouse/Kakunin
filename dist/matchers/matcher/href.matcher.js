'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexBuilder = require('./regex-matcher/regex-builder');

var _regexBuilder2 = _interopRequireDefault(_regexBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HrefMatcher = {
  isSatisfiedBy: function (prefix, name) {
    const parameters = name.split(':');

    return prefix === 'f:' && parameters[0] === 'href';
  },

  match: function (element, matcherName) {
    const splittedValue = matcherName.split(':');

    return element.getAttribute('href').then(value => _regexBuilder2.default.buildRegex(`r:${splittedValue[2]}`).test(value));
  }
};

exports.default = HrefMatcher;