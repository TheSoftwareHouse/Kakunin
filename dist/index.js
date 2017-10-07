'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDictionary = exports.BasePage = exports.emailService = exports.comparators = exports.handlers = exports.variableStore = exports.generators = exports.transformers = exports.dictionaries = exports.defineSupportCode = exports.regexBuilder = exports.matchers = undefined;

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

var _transformers = require('./transformers');

Object.defineProperty(exports, 'transformers', {
  enumerable: true,
  get: function () {
    return _transformers.transformers;
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

var _handlers = require('./form-handlers/handlers');

Object.defineProperty(exports, 'handlers', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_handlers).default;
  }
});

var _comparators = require('./comparators');

Object.defineProperty(exports, 'comparators', {
  enumerable: true,
  get: function () {
    return _comparators.comparators;
  }
});

var _emails = require('./emails');

Object.defineProperty(exports, 'emailService', {
  enumerable: true,
  get: function () {
    return _emails.emailService;
  }
});

var _pages = require('./pages');

var pages = _interopRequireWildcard(_pages);

var dictionaries = _interopRequireWildcard(_dictionaries);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BasePage = exports.BasePage = pages.Form;
const BaseDictionary = exports.BaseDictionary = dictionaries.Base;