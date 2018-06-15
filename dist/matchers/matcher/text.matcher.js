'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textMatcher = undefined;

var _matchers = require('../matchers');

class TextMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 't';
  }

  match(element, ...params) {
    const expectedValue = params.join(_matchers.separator);

    return element.getText().then(text => {
      if (new RegExp(RegExp.escape(expectedValue)).test(text)) {
        return true;
      }

      return Promise.reject(`
        Matcher "TextMatcher" could not match value on element "${element.locator()}".
        Expected: "${expectedValue}", Given: "${text}"
      `);
    });
  }
}

const textMatcher = exports.textMatcher = new TextMatcher();