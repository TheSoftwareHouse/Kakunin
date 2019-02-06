import * as comparators from './comparator';

class Comparators {
  private availableComparators: Comparator[];

  constructor() {
    this.availableComparators = [comparators.DateComparator, comparators.NumberComparator];
  }

  public compare(values: any[], order: string): Promise<string | void> {
    const comparator = this.findComparator(values);

    if (comparator === undefined) {
      throw new Error(`Could not find comparator for ${values}.`);
    }

    return comparator.compare(values, order);
  }

  public findComparator(values: any[]): Comparator {
    return this.availableComparators.find(comparator => comparator.isSatisfiedBy(values));
  }

  public addComparator(comparator: Comparator): void {
    this.availableComparators.push(comparator);
  }
}

export const create = () => new Comparators();
