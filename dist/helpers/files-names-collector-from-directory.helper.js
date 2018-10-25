'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filesNameCollectorFromDirectory = undefined;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const filesNameCollectorFromDirectory = exports.filesNameCollectorFromDirectory = (() => {
  var _ref = _asyncToGenerator(function* (path) {
    return yield (0, _glob2.default)(path, function (err, files) {
      if (err || files.length === 0) {
        throw new Error('Could not find any files matching regex in the directory!');
      }

      return files;
    });
  });

  return function filesNameCollectorFromDirectory(_x) {
    return _ref.apply(this, arguments);
  };
})();