'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeXlsx = require('node-xlsx');

var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

var _config = require('../../core/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FileManager = {
  wasDownloaded: function (expectedFileName) {
    return browser.driver.wait(function () {
      return _fs2.default.existsSync(_path2.default.join(_config2.default.projectPath, _config2.default.downloads, expectedFileName));
    }, _config2.default.downloadTimeout * 1000);
  },

  parseXLS: function (expectedFileName) {
    return _nodeXlsx2.default.parse(_path2.default.join(_config2.default.projectPath, _config2.default.downloads, expectedFileName))[0].data;
  }
};

exports.default = FileManager;