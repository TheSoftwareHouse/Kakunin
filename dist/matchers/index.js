'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexBuilder = exports.matchers = undefined;

var _matchers = require('./matchers');

var _regexBuilder = require('./matcher/regex-matcher/regex-builder');

var _regexBuilder2 = _interopRequireDefault(_regexBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matchers = exports.matchers = (0, _matchers.create)();
const regexBuilder = exports.regexBuilder = _regexBuilder2.default;