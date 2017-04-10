const fs = require('fs');

const pascalConfig = require('../helpers/pascalConfig');
const modulesLoader = require('../helpers/modulesLoader');

const availableComparators = modulesLoader.getModules(pascalConfig.comparators, [__dirname + '/comparators']);

const Comparators = {
  compare: function (values, order) {
    const comparator = this.findComparator(values);

    if (comparator === undefined) {
      throw new Error(`Could not find comparator for ${values}.`);
    }

    return comparator.compare(values, order);
  },
  findComparator: function (values) {
    return availableComparators.find((comparator) => comparator.isSatisfiedBy(values));
  }
};

module.exports = Comparators;
