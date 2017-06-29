'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class VisibleMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isVisible';
  }

  match(element) {
    return element.isDisplayed().then(() => true).catch(() => false);
  }
}

const visibleMatcher = exports.visibleMatcher = new VisibleMatcher();