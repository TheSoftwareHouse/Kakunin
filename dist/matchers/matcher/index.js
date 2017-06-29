'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clickable = require('./clickable.matcher');

Object.defineProperty(exports, 'clickableMatcher', {
  enumerable: true,
  get: function () {
    return _clickable.clickableMatcher;
  }
});

var _invisible = require('./invisible.matcher');

Object.defineProperty(exports, 'invisibleMatcher', {
  enumerable: true,
  get: function () {
    return _invisible.invisibleMatcher;
  }
});

var _notClickable = require('./not-clickable.matcher');

Object.defineProperty(exports, 'notClickableMatcher', {
  enumerable: true,
  get: function () {
    return _notClickable.notClickableMatcher;
  }
});

var _present = require('./present.matcher');

Object.defineProperty(exports, 'presentMatcher', {
  enumerable: true,
  get: function () {
    return _present.presentMatcher;
  }
});

var _text = require('./text.matcher');

Object.defineProperty(exports, 'textMatcher', {
  enumerable: true,
  get: function () {
    return _text.textMatcher;
  }
});

var _visible = require('./visible.matcher');

Object.defineProperty(exports, 'visibleMatcher', {
  enumerable: true,
  get: function () {
    return _visible.visibleMatcher;
  }
});

var _regexMatcher = require('./regex-matcher');

Object.defineProperty(exports, 'regexMatcher', {
  enumerable: true,
  get: function () {
    return _regexMatcher.regexMatcher;
  }
});

var _attribute = require('./attribute.matcher');

Object.defineProperty(exports, 'attributeMatcher', {
  enumerable: true,
  get: function () {
    return _attribute.attributeMatcher;
  }
});