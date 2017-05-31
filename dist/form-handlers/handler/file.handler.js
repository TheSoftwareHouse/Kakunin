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

const FileHandler = {

  registerFieldType: false,
  fieldType: 'file',

  handleFill: function (page, elementName, desiredValue) {
    const fileToUpload = _path2.default.resolve(_config2.default.projectPath + _config2.default.data + '/' + desiredValue);

    return page[elementName].sendKeys(fileToUpload);
  },

  handleCheck: function (page, elementName, desiredValue) {
    return page[elementName].getText().then(function (text) {
      if (text === desiredValue) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }
};

const fileHandler = exports.fileHandler = FileHandler;