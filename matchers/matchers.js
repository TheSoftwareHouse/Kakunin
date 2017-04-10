const fs = require('fs');
const pascalConfig = require('../helpers/pascalConfig');
const modulesLoader = require('../helpers/modulesLoader');

const availableMatchers = modulesLoader.getModules(pascalConfig.matchers, [__dirname + '/matchers']);

const Matchers = {
  match: function(element, matcherName) {
    const matcher = this.findMatcher(matcherName.substr(0,2), matcherName.substr(2));

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, matcherName);
  },
  findMatcher: function (prefix, name) {
    return availableMatchers.find((matcher) => matcher.isSatisfiedBy(prefix, name));
  }
};

module.exports = Matchers;
