import * as generator from './generator';
import { create as createModulesLoader } from '../helpers/modules-loader.helper';

const modulesLoader = createModulesLoader();

class Generators {
  constructor(loader) {
    this.availableGenerators = [
      generator.stringWithLengthGenerator,
      ...loader.getModules('generators')
    ];
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

export const create = (loader = modulesLoader) => new Generators(loader);
