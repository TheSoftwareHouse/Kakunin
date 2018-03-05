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

  match(element, ...matcherName) {
    matcherName = matcherName.join(_matchers.separator);

    return element.getText().then(text => new RegExp(RegExp.escape(matcherName)).test(text));
  }
}

const textMatcher = exports.textMatcher = new TextMatcher();