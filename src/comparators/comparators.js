import * as comparator from './comparator';
import { create  as createModulesLoader} from '../helpers/modules-loader.helper';

const modulesLoader = createModulesLoader();

class Comparators {
  constructor(loader) {
    this.availableComparators = [
      comparator.DateComparator,
      comparator.NumberComparator,
      ...loader.getModules('comparators')
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
}

export const create = (loader = modulesLoader) => new Comparators(loader);
