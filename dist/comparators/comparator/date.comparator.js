'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateComparator = exports.supportedFormats = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const supportedFormats = exports.supportedFormats = ['DD-MM-YYYY', 'DD-MM-YY', 'DD/MM/YYYY', 'DD/MM/YY'];

const isValidDate = date => {
  for (let index = 0; index < supportedFormats.length; index++) {
    if ((0, _moment2.default)(date, supportedFormats[index]).isValid()) {
      return true;
    }
  }

  return false;
};

const DateComparator = exports.DateComparator = {

  isSatisfiedBy: values => {
    for (let i = 0; i < values.length; i++) {
      const date = values[i];
      const found = isValidDate(date);

      if (!found) {
        return false;
      }
    }
    return true;
  },

  compare: (values, order) => {
    for (let i = 1; i < values.length; i++) {
      const datePrevious = values[i - 1];
      const date = values[i];
      const foundPrevious = (0, _moment2.default)(datePrevious, supportedFormats.find(format => (0, _moment2.default)(datePrevious, format).isValid()));
      const found = (0, _moment2.default)(date, supportedFormats.find(format => (0, _moment2.default)(date, format).isValid()));

      const previousTimestamp = foundPrevious.unix();
      const currentTimestamp = found.unix();

      if (order === 'ascending') {
        if (currentTimestamp < previousTimestamp) {
          return Promise.reject(`Date ${foundPrevious[1]} should be before ${found[1]}.`);
        }
      } else if (currentTimestamp > previousTimestamp) {
        return Promise.reject(`Date ${found[1]} should be after ${foundPrevious[1]}.`);
      }
    }
    return Promise.resolve();
  }
};