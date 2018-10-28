'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentDateMatcher = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'currentDate';
  }

  // eslint-disable-next-line no-unused-vars
  match(element, name = null, params = 'DD-MM-YYYY') {
    const currentDate = (0, _moment2.default)(new Date()).format(params);
    return element.getText().then(text => {
      const compareDate = (0, _moment2.default)(new Date(text)).format(params);

      if (compareDate === currentDate) {
        return true;
      }

      /* eslint-disable max-len */
      return Promise.reject(`
        Matcher "CurrentDate" could not match date for element "${element.locator()}". Expected: "${compareDate}", given: "${currentDate}".
      `);
      /* eslint-enable max-len */
    });
  }
}

const currentDateMatcher = exports.currentDateMatcher = new CurrentDateMatcher();