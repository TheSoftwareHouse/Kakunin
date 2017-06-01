'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _modulesLoader = require('../helpers/modules-loader.helper');

var _matcher = require('./matcher');

var matcher = _interopRequireWildcard(_matcher);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const modulesLoader = (0, _modulesLoader.create)();

class Matchers {
  constructor(loader) {
    this.availableMatchers = [matcher.regexMatcher, matcher.clickableMatcher, matcher.invisibleMatcher, matcher.notClickableMatcher, matcher.presentMatcher, matcher.textMatcher, matcher.visibleMatcher];
  }

  addMatcher(matcher) {
    this.availableMatchers.push(matcher);
  }

  match(element, matcherName) {
    const matcher = this.findMatcher(matcherName.substr(0, 2), matcherName.substr(2));

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, matcherName);
  }

  findMatcher(prefix, name) {
    return this.availableMatchers.find(matcher => matcher.isSatisfiedBy(prefix, name));
  }
}

const create = exports.create = (loader = modulesLoader) => new Matchers(loader);