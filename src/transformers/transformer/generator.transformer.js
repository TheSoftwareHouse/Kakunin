import { generators } from '../../generators';

class GeneratorTransformer {
  constructor(generator) {
    this.generator = generator;
  }

  isSatisfiedBy(prefix) {
    return prefix === 'g:';
  }

  transform(value) {
    const splittedValues = value.split(':');
    const generatorName = splittedValues[0];

    return this.generator.generate(generatorName, splittedValues.slice(1));
  }
}
export const createGeneratorTransformer = (geners = generators) => new GeneratorTransformer(geners);
