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
    return element.getAttribute(attributeName).then(value => {
      if (_regexBuilder.regexBuilder.buildRegex(`r:${regexName}`).test(value)) {
        return true;
      }

      return Promise.reject(`
        Matcher "AttributeMatcher" could not match regex on element "${element.locator()}" on attribute "${attributeName}". 
        Expected to match: "${_regexBuilder.regexBuilder.buildRegex(`r:${regexName}`).toString()}", Given: "${value}"
      `);
    });
  }
}

const attributeMatcher = exports.attributeMatcher = new AttributeMatcher();