import { create } from './generators';

const generators = create();

describe('Generators', () => {
  it('throws an error when no generator was found', () => {
    expect(() => generators.generate('unknown-generator')).toThrow('Could not find generator for unknown-generator.');
  });

  it('return generated value', done => {
    generators.generate('stringWithLength', 100).then(result => {
      expect(result.length).toEqual(100);
      done();
    });
  });

  it('adds new generator', done => {
    const customGenerator = {
      isSatisfiedBy: name => name === 'customGenerator',
      generate: params => {
        return Promise.resolve(params);
      },
    };

    generators.addGenerator(customGenerator);
    generators.generate('customGenerator', 'params').then(result => {
      expect(result).toEqual('params');
      done();
    });
  });
});
