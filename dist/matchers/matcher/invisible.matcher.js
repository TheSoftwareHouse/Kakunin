'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const InvisibleMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f' && name === 'isNotVisible';
  },
  match: function (element) {
    return element.isDisplayed().then(() => false).catch(() => true);
  }
};

exports.default = InvisibleMatcher;