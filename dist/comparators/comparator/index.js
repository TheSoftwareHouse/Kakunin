'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _date = require('./date.comparator');

Object.keys(_date).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _date[key];
    }
  });
});

var _number = require('./number.comparator');

Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number[key];
    }
  });
});