'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexMatcher = undefined;

var _regexBuilder = require('./regex-builder');

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegexMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof _regex2.default[name] !== 'undefined';
  }

  match(element, regexName) {
    return element.getText().then(text => {
      return element.getAttribute('value').then(value => {
        const regularExpression = _regexBuilder.regexBuilder.buildRegex(`r:${regexName}`);

        if (text === '') {
          if (value === null) {
            return Promise.reject(`
                  Matcher "RegexMatcher" could not match value for element "${element.locator()}".
                  Both text and attribute value are empty.
                `);
          }

          if (regularExpression.test(value)) {
            return true;
          }

          return Promise.reject(`
                Matcher "RegexMatcher" could not match regex on element "${element.locator()}" on value "${value}". 
                Expected to match: "${regularExpression.toString()}", Given: "${value}"
              `);
        }

        if (regularExpression.test(text)) {
          return true;
        }

        return Promise.reject(`
              Matcher "RegexMatcher" could not match regex on element "${element.locator()}" on text "${text}". 
              Expected to match: "${regularExpression.toString()}", Given: "${text}"
            `);
      });
    });
  }
}

const regexMatcher = exports.regexMatcher = new RegexMatcher();