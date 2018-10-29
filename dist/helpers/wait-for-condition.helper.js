'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForInvisibilityOf = exports.waitForVisibilityOf = exports.waitForCondition = undefined;

var _config = require('./config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const globalTimeout = parseInt(_config2.default.elementsVisibilityTimeout) * 1000;

const waitForCondition = exports.waitForCondition = (condition, timeout) => {
  return element => {
    if (element instanceof protractor.ElementArrayFinder) {
      return browser.wait(protractor.ExpectedConditions[condition](element.first()), timeout);
    }

    return browser.wait(protractor.ExpectedConditions[condition](element), timeout);
  };
};

const waitForVisibilityOf = exports.waitForVisibilityOf = element => {
  return waitForCondition('visibilityOf', globalTimeout)(element);
};

const waitForInvisibilityOf = exports.waitForInvisibilityOf = element => {
  return waitForCondition('invisibilityOf', globalTimeout)(element);
};