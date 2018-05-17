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

  match(element, dateFormat = '{dd}-{MM}-{yyyy}') {
    const currentDate = _sugarDate2.default.Date.format(_sugarDate2.default.Date.create('now'), dateFormat);

    return element.getText().then(text => {
      const compareDate = _sugarDate2.default.Date.format(_sugarDate2.default.Date.create(text), dateFormat);
      return compareDate === currentDate ? true : false;
    }).catch(false);
  }
}

const currentDateMatcher = exports.currentDateMatcher = new CurrentDateMatcher();