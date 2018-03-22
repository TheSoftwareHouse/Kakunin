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
    return prefix === 'm' && name === 'currentDate';
  }

  match(element) {
    const currentDate = _sugarDate2.default.Date.format(_sugarDate2.default.Date.create('now'), '{yyyy}-{MM}-{dd}');
    return element.getText().then(text => {
      const compareDate = _sugarDate2.default.Date.format(_sugarDate2.default.Date.create(text), '{yyyy}-{MM}-{dd}');
      return compareDate === currentDate ? true : false;
    }).catch(false);
  }
}

const currentDateMatcher = exports.currentDateMatcher = new CurrentDateMatcher();