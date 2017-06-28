'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexMatcher = undefined;

var _regexBuilder = require('./regex-builder');

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

console.log(_regexBuilder.regexBuilder);

class RegexMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof _regex2.default[name] !== 'undefined';
  }

  match(element, matcherName) {
    return _asyncToGenerator(function* () {
      const text = yield element.getText();
      const value = yield element.getAttribute('value');

      if (text === '') {
        if (value === null) {
          return false;
        }

        return _regexBuilder.regexBuilder.buildRegex(`r:${matcherName}`).test(value);
      }

      return _regexBuilder.regexBuilder.buildRegex(`r:${matcherName}`).test(text);
    })();
  }
}

const regexMatcher = exports.regexMatcher = new RegexMatcher();