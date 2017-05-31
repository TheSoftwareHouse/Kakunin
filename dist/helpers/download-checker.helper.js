'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('./config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DownloadChecker = {
  wasDownloaded: function (expectedFileName) {
    return browser.driver.wait(function () {
      return _fs2.default.existsSync(_config2.default.projectPath + _config2.default.downloads + '/' + expectedFileName);
    }, 30000);
  }
};

exports.default = DownloadChecker;