const modulesLoader = require('../helpers/modulesLoader').create();

class Comparators {
  constructor(loader) {
    this.availableComparators = loader.getModules('comparators');
  }

  compare(values, order) {
    const comparator = this.findComparator(values);

    if (comparator === undefined) {
      throw new Error(`Could not find comparator for ${values}.`);
    }

    return comparator.compare(values, order);
  }

  findComparator(values) {
    return this.availableComparators.find((comparator) => comparator.isSatisfiedBy(values));
  }
}

module.exports.create = (loader = modulesLoader) => new Comparators(loader);
