'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class PresentMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isPresent';
  }

  match(element) {
    return element.isPresent().then(() => true).catch(() => false);
  }
}

const presentMatcher = exports.presentMatcher = new PresentMatcher();