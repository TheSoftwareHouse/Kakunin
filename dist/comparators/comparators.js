'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _comparator = require('./comparator');

var comparator = _interopRequireWildcard(_comparator);

var _modulesLoader = require('../helpers/modules-loader.helper');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const modulesLoader = (0, _modulesLoader.create)();

class Comparators {
  constructor(loader) {
    this.availableComparators = [comparator.DateComparator, comparator.NumberComparator, ...loader.getModules('comparators')];
  }

  compare(values, order) {
    const comparator = this.findComparator(values);

    if (comparator === undefined) {
      throw new Error(`Could not find comparator for ${values}.`);
    }

    return comparator.compare(values, order);
  }

  findComparator(values) {
    return this.availableComparators.find(comparator => comparator.isSatisfiedBy(values));
  }
}

const create = exports.create = (loader = modulesLoader) => new Comparators(loader);