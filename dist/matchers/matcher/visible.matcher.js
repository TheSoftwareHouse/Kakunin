'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const VisibleMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f' && name === 'isVisible';
  },
  match: function (element, matcherName) {
    return element.isDisplayed().then(() => true).catch(() => false);
  }
};

exports.default = VisibleMatcher;