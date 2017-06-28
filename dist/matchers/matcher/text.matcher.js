'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class TextMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 't';
  }

  match(element, matcherName) {
    return element.getText().then(text => new RegExp(RegExp.escape(matcherName)).test(text));
  }
}

const textMatcher = exports.textMatcher = new TextMatcher();