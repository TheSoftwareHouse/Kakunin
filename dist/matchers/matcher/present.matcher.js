'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class PresentMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isPresent';
  }

  match(element) {
    return element.isPresent().then(() => true).catch(() => Promise.reject(`
      Matcher "PresentMatcher" could not find element "${element.locator()}".
    `));
  }
}

const presentMatcher = exports.presentMatcher = new PresentMatcher();