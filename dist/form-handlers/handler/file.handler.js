'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileHandler = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FileHandler {
  isSatisfiedBy(element, elementName) {
    return element.getTagName().then(function (tagName) {
      if (tagName === 'input') {
        return element.getAttribute('type').then(inputType => inputType === 'file');
      }

      if (tagName instanceof Array) {
        return element.first().getAttribute('type').then(inputType => inputType === 'file');
      }

      return false;
    });
  }

  handleFill(page, elementName, desiredValue) {
    const fileToUpload = _path2.default.resolve(_config2.default.projectPath + _config2.default.data + '/' + desiredValue);

    return page[elementName].sendKeys(fileToUpload);
  }

  handleCheck(page, elementName, desiredValue) {
    return page[elementName].getText().then(function (text) {
      if (text === desiredValue) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }

  getPriority() {
    return 998;
  }
}

const fileHandler = exports.fileHandler = new FileHandler();