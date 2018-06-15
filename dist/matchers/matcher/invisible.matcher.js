'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class InvisibleMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isNotVisible';
  }

  match(element) {
    return element.isDisplayed().then(() => false).catch(() => Promise.reject(`
      Matcher "InvisibleMatcher" could find element "${element.locator()}". Expected element to be invisible.
    `));
  }
}

const invisibleMatcher = exports.invisibleMatcher = new InvisibleMatcher();