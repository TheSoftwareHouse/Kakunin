'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteReports = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteReports = exports.deleteReports = directory => {
  return _fs2.default.readdirSync(directory).filter(file => _fs2.default.statSync(_path2.default.join(directory, file)).isFile() && file !== '.gitkeep').forEach(file => _fs2.default.unlinkSync(_path2.default.join(directory, file)));
};