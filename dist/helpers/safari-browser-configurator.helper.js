'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safariBrowserConfigurator = undefined;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safariBrowserConfigurator = exports.safariBrowserConfigurator = config => {
  _shelljs2.default.exec(`defaults write -app Safari DownloadsPath ${_path2.default.join(config.projectPath, config.downloads)}`);
};