'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexBuilder = exports.matchers = undefined;

var _matchers = require('./matchers');

var _regexBuilder = require('./matcher/regex-matcher/regex-builder');

const matchers = exports.matchers = (0, _matchers.create)();
const regexBuilder = exports.regexBuilder = _regexBuilder.regexBuilder;