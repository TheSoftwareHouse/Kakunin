import { generators } from '../../generators';

class GeneratorTransformer {
  public generator: any;

  constructor(generator) {
    this.generator = generator;
  }

  public isSatisfiedBy(prefix) {
    return prefix === 'g:';
  }

  public transform(value) {
    const splittedValues = value.split(':');
    const generatorName = splittedValues[0];

    return this.generator.generate(generatorName, splittedValues.slice(1));
  }
}
export const createGeneratorTransformer = (geners = generators) => new GeneratorTransformer(geners);
