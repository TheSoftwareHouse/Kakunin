'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class InvisibleMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isNotVisible';
  }

  match(element) {
    return _asyncToGenerator(function* () {
      try {
        yield element.isDisplayed();
        return Promise.reject(`
        Matcher "InvisibleMatcher" could find element "${element.locator()}". Expected element to be invisible.
      `);
      } catch (err) {
        return true;
      }
    })();
  }
}

const invisibleMatcher = exports.invisibleMatcher = new InvisibleMatcher();