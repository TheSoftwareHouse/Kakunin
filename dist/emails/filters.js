'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filters = undefined;

var _filter = require('./filter');

var filter = _interopRequireWildcard(_filter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Filters {
  constructor() {
    this.availableFilters = [filter.currentUserFilter, filter.minimalEmailSizeFilter, filter.textFieldFilter];
  }

  filter(emails, type, value, world) {
    const filter = this.findFilter(type);

    if (typeof filter === 'undefined') {
      throw new Error(`Could not find filter for ${type}.`);
    }

    return filter.filter(emails, type, value, world);
  }

  findFilter(type) {
    return this.availableFilters.find(filter => filter.isSatisfiedBy(type));
  }
}

const filters = exports.filters = new Filters();