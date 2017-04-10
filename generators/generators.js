const fs = require('fs');


const pascalConfig = require('../helpers/pascalConfig');
const modulesLoader = require('../helpers/modulesLoader');

const availableGenerators = modulesLoader.getModules(pascalConfig.generators, [__dirname + '/generators']);

const Generators = {
  generate: function(generatorName) {
    const gen = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate();
  },

  findGenerator: function (name) {
    return availableGenerators.find((gen) => gen.isSatisfiedBy(name));
  }
};

module.exports = Generators;
