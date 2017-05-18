const modulesLoader = require('../helpers/modulesLoader').create();

class Generators {
  constructor(loader) {
    this.availableGenerators = loader.getModules('generators');
  }

  generate(generatorName, ...params) {
    const gen = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate(...params);
  }

  findGenerator(name) {
    return this.availableGenerators.find((gen) => gen.isSatisfiedBy(name));
  }
}

module.exports.create = (loader = modulesLoader) => new Generators(loader);
