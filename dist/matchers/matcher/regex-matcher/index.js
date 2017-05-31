'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexBuilder = require('./regex-builder');

var _regexBuilder2 = _interopRequireDefault(_regexBuilder);

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RegexMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'r:' && typeof _regex2.default[name] !== 'undefined';
  },
  match: function (element, matcherName) {
    return element.getText().then(text => {
      return element.getAttribute('value').then(function (value) {
        if (text === '') {
          return _regexBuilder2.default.buildRegex(matcherName).test(value);
        }

        return _regexBuilder2.default.buildRegex(matcherName).test(text);
      });
    });
  }
};

exports.default = RegexMatcher;