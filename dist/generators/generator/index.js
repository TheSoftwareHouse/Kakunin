'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringWithLength = require('./string-with-length.generator');

Object.keys(_stringWithLength).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stringWithLength[key];
    }
  });
});