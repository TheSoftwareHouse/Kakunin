'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexMatcher = undefined;

var _regexBuilder = require('./regex-builder');

var _regexBuilder2 = _interopRequireDefault(_regexBuilder);

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegexMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof _regex2.default[name] !== 'undefined';
  }

  match(element, matcherName) {
    return element.getText().then(text => {
      return element.getAttribute('value').then(function (value) {
        if (text === '') {
          if (value === null) {
            return false;
          }

          return _regexBuilder2.default.buildRegex(`r:${matcherName}`).test(value);
        }

        return _regexBuilder2.default.buildRegex(`r:${matcherName}`).test(text);
      });
    });
  }
}

const regexMatcher = exports.regexMatcher = new RegexMatcher();