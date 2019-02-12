import { generators, Generators } from '../../generators';

class GeneratorTransformer implements ValueTransformer {
  constructor(public generator: Generators) {}

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
