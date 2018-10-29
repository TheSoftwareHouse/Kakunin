'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _modulesLoader = require('../../../helpers/modules-loader.helper');

var _default = require('./regexes/default');

const modulesLoader = (0, _modulesLoader.create)();
const availableRegexes = modulesLoader.getModules('regexes');

const regularExpressions = availableRegexes.reduce((regexes, newRegexes) => _extends({}, regexes, newRegexes), _extends({}, _default.regex));

exports.default = regularExpressions;