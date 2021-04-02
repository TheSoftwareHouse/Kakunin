import * as defaultFilters from './filter';

class Filters {
  private availableFilters: any;

  constructor() {
    this.availableFilters = [
      defaultFilters.currentUserFilter,
      defaultFilters.minimalEmailSizeFilter,
      defaultFilters.textFieldFilter,
    ];
  }

  public filter(emails, type, value, world) {
    const filter = this.findFilter(type);

    if (typeof filter === 'undefined') {
      throw new Error(`Could not find filter for ${type}.`);
    }

    return filter.filter(emails, type, value, world);
  }

  public findFilter(type) {
    return this.availableFilters.find((filter) => filter.isSatisfiedBy(type));
  }
}

export const filters = new Filters();
