import * as comparators from './comparator';

class Comparators {
  private availableComparators: any;

  constructor() {
    this.availableComparators = [comparators.DateComparator, comparators.NumberComparator];
  }

  public compare(values, order) {
    const comparator = this.findComparator(values);

    if (comparator === undefined) {
      throw new Error(`Could not find comparator for ${values}.`);
    }

    return comparator.compare(values, order);
  }

  public findComparator(values) {
    return this.availableComparators.find(comparator => comparator.isSatisfiedBy(values));
  }

  public addComparator(comparator) {
    this.availableComparators.push(comparator);
  }
}

export const create = () => new Comparators();
