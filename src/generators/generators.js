import * as generators from './generator';

class Generators {
  constructor() {
    this.availableGenerators = [generators.personalDataGenerator, generators.stringWithLengthGenerator];
  }

  generate(generatorName, ...params) {
    const gen = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate(...params);
  }

  addGenerator(generator) {
    this.availableGenerators.push(generator);
  }

  findGenerator(name) {
    return this.availableGenerators.find(gen => gen.isSatisfiedBy(name));
  }
}

export const create = () => new Generators();
