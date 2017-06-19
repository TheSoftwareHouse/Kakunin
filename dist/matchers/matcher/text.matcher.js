'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const TextMatcher = {
  isSatisfiedBy: function (prefix) {
    return prefix === 't:';
  },

  match: function (element, matcherName) {
    return element.getText().then(text => new RegExp(RegExp.escape(matcherName.substr(2))).test(text));
  }
};

exports.default = TextMatcher;