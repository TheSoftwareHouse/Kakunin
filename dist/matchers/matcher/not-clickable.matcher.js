'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const NotClickableMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isNotClickable';
  },
  match: function (element) {
    return element.getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) !== -1;
    });
  }
};

exports.default = NotClickableMatcher;