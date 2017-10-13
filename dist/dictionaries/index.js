'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = exports.dictionaries = undefined;

var _dictionaries = require('./dictionaries');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dictionaries = exports.dictionaries = (0, _dictionaries.create)();
const Base = exports.Base = _base2.default;