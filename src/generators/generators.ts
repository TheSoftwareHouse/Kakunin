import * as generators from './generator';
import { Generator } from './generator.interface';

export class Generators {
  constructor(
    private availableGenerators: Generator[] = [generators.personalDataGenerator, generators.stringWithLengthGenerator]
  ) {}

  public generate(generatorName: string, ...params: any): Promise<any> {
    const gen: Generator = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate(...params);
  }

  public addGenerator(generator: Generator): void {
    this.availableGenerators.push(generator);
  }

  public findGenerator(name: string): Generator {
    return this.availableGenerators.find(gen => gen.isSatisfiedBy(name));
  }
}

export const create = () => new Generators();
