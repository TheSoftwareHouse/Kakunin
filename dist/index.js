'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePage = exports.FormPage = exports.defineSupportCode = undefined;

var _cucumber = require('cucumber');

Object.defineProperty(exports, 'defineSupportCode', {
  enumerable: true,
  get: function () {
    return _cucumber.defineSupportCode;
  }
});

var _pages = require('./pages');

var pages = _interopRequireWildcard(_pages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const FormPage = exports.FormPage = pages.Form;
const BasePage = exports.BasePage = pages.Base;