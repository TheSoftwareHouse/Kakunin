const availableFilters = require('fs').readdirSync(__dirname + '/filters')
  .map((filename) => require(__dirname + '/filters/' + filename));

class Filters {
  filter(emails, type, value, world) {
    const filter = this.findFilter(type);

    if (typeof (filter) === 'undefined') {
      throw new Error(`Could not find filter for ${type}.`);
    }

    return filter.filter(emails, type, value, world);
  }

  findFilter(type) {
    return availableFilters.find((filter) => filter.isSatisfiedBy(type));
  }
}

module.exports = new Filters();
