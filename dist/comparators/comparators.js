'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _comparator = require('./comparator');

var comparator = _interopRequireWildcard(_comparator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Comparators {
  constructor() {
    this.availableComparators = [comparator.DateComparator, comparator.NumberComparator];
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

  addComparator(comparator) {
    this.availableComparators.push(comparator);
  }
}

const create = exports.create = () => new Comparators();