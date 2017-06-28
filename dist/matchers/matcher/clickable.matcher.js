'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ClickableMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isClickable';
  }

  match(element) {
    return element.getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) === -1;
    });
  }
}

const clickableMatcher = exports.clickableMatcher = new ClickableMatcher();