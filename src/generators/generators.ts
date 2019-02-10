import * as generators from './generator';

export class Generators {
  constructor(
    private availableGenerators: DataGenerator[] = [
      generators.personalDataGenerator,
      generators.stringWithLengthGenerator,
    ]
  ) {}

  public generate(generatorName: string, ...params: any): Promise<any> {
    const gen: DataGenerator = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate(...params);
  }

  public addGenerator(generator: DataGenerator): void {
    this.availableGenerators.push(generator);
  }

  public findGenerator(name: string): DataGenerator {
    return this.availableGenerators.find(gen => gen.isSatisfiedBy(name));
  }
}

export const create = () => new Generators();
