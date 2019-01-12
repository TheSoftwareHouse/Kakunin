'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareCatalogs = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const prepareCatalogs = exports.prepareCatalogs = (() => {
  var _ref = _asyncToGenerator(function* (directory) {
    if (_fs2.default.existsSync(directory)) {
      return Promise.resolve();
    }

    yield (0, _mkdirp2.default)(directory);
    yield console.log(`${directory} has been added!`);
    yield _fs2.default.writeFileSync(`${directory}/.gitkeep`, '');
  });

  return function prepareCatalogs(_x) {
    return _ref.apply(this, arguments);
  };
})();