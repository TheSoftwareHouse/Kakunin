const modulesLoader = require('../helpers/modulesLoader').create();

class Matchers {
  constructor(loader) {
    this.availableMatchers = loader.getModules('matchers');
  }

  match(element, matcherName) {
    const matcher = this.findMatcher(matcherName.substr(0, 2), matcherName.substr(2));

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, matcherName);
  }

  findMatcher(prefix, name) {
    return this.availableMatchers.find((matcher) => matcher.isSatisfiedBy(prefix, name));
  }
}

module.exports.create = (loader = modulesLoader) => new Matchers(loader);
