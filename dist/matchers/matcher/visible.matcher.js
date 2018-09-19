'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class VisibleMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isVisible';
  }

  match(element) {
    return element.isDisplayed().then(() => true).catch(() => Promise.reject(`
      Matcher "VisibleMatcher" could not find element "${element.locator()}".
    `));
  }
}

const visibleMatcher = exports.visibleMatcher = new VisibleMatcher();