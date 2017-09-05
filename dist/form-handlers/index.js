'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlers = require('./handlers');

Object.defineProperty(exports, 'fromHandlers', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_handlers).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }