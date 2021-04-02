import { create } from './transformers';

const transformers = create();

describe('Value transformers', () => {
  it('returns the same value if transformer has not been found', () => {
    const emptyTransformer = create([]);

    expect(emptyTransformer.transform('some value')).toEqual('some value');
  });

  it('returns transformed value when expected transformer has been found', () => {
    const fakeTransformer: any = {
      isSatisfiedBy: (prefix) => prefix === 'v:',
      transform: (value) => {
        expect(value).toEqual('value');
        return 'expected value';
      },
    };
    const transformers = create([fakeTransformer]);

    expect(transformers.transform('v:value')).toEqual('expected value');
  });

  it('adds a transformer', () => {
    const customTransformer = {
      isSatisfiedBy: (prefix) => prefix === 'j:',
      transform: () => 'custom-transformer',
    };

    transformers.addTransformer(customTransformer);

    expect(transformers.transform('j:custom-transformer')).toEqual('custom-transformer');
  });
});
