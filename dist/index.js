'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePage = exports.FormPage = exports.variableStore = exports.generators = exports.dictionaries = exports.defineSupportCode = exports.regexBuilder = exports.matchers = undefined;

var _matchers = require('./matchers');

Object.defineProperty(exports, 'matchers', {
  enumerable: true,
  get: function () {
    return _matchers.matchers;
  }
});
Object.defineProperty(exports, 'regexBuilder', {
  enumerable: true,
  get: function () {
    return _matchers.regexBuilder;
  }
});

var _cucumber = require('cucumber');

Object.defineProperty(exports, 'defineSupportCode', {
  enumerable: true,
  get: function () {
    return _cucumber.defineSupportCode;
  }
});

var _dictionaries = require('./dictionaries');

Object.defineProperty(exports, 'dictionaries', {
  enumerable: true,
  get: function () {
    return _dictionaries.dictionaries;
  }
});

var _generators = require('./generators');

Object.defineProperty(exports, 'generators', {
  enumerable: true,
  get: function () {
    return _generators.generators;
  }
});

var _variableStore = require('./helpers/variable-store.helper');

Object.defineProperty(exports, 'variableStore', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_variableStore).default;
  }
});

var _pages = require('./pages');

var pages = _interopRequireWildcard(_pages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FormPage = exports.FormPage = pages.Form;
const BasePage = exports.BasePage = pages.Base;