import * as comparator from './comparator';

class Comparators {
  constructor() {
    this.availableComparators = [
      comparator.DateComparator,
      comparator.NumberComparator,
    ];
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

  addComparator(comparator) {
    this.availableComparators.push(comparator);
  }
}

export const create = () => new Comparators();
