'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentDateMatcher = undefined;

var _sugarDate = require('sugar-date');

var _sugarDate2 = _interopRequireDefault(_sugarDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'currentDate';
  }

  match(element) {
    let currentDate = _sugarDate2.default.Date.create('now');
    currentDate = _sugarDate2.default.Date.format(currentDate, '{yyyy}-{MM}-{dd}');

    return element.getText().then(text => {
      let compareDate = _sugarDate2.default.Date.create(text);
      compareDate = _sugarDate2.default.Date.format(compareDate, '{yyyy}-{MM}-{dd}');

      if (compareDate === currentDate) {
        return true;
      } else {
        return false;
      }
    });
  }
}

const currentDateMatcher = exports.currentDateMatcher = new CurrentDateMatcher();