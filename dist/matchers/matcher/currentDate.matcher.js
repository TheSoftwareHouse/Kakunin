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

  match(element, name = null, params = 'DD-MM-YYYY') {
    const currentDate = (0, _moment2.default)(new Date()).format(params);
    return element.getText().then(text => {
      const compareDate = (0, _moment2.default)(new Date(text)).format(params);
      return compareDate === currentDate;
    }).catch(false);
  }
}

const currentDateMatcher = exports.currentDateMatcher = new CurrentDateMatcher();