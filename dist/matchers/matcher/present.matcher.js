'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const PresentMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f' && name === 'isPresent';
  },

  match: function (element, matcherName) {
    return element.isPresent().then(() => true).catch(() => false);
  }
};

exports.default = PresentMatcher;