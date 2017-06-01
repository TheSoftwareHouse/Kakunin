import {create} from './transformers';

const chai = require('chai');
const expect = chai.expect;

const transformers = create();

describe('Value transformers', () => {
  it('returns the same value if transformer has not been found', () => {
    const emptyTransformer = create([]);

    expect(emptyTransformer.transform('some value')).to.equal('some value');
  });

  it('returns transformed value when expected transformer has been found', () => {
    const fakeTransformer = {
      isSatisfiedBy: (prefix) => prefix === 'v:',
      transform: (value) => {
        expect(value).to.equal('value');
        return 'expected value';
      }
    };
    const transformers = create([fakeTransformer]);

    expect(transformers.transform('v:value')).to.equal('expected value');
  });

  it('adds a transformer', () => {
    const customTransformer = {
      isSatisfiedBy: (prefix) => prefix === 'j:',
      transform: () => 'custom-transformer'
    };

    transformers.addTransformer(customTransformer);

    expect(transformers.transform('j:custom-transformer')).to.equal('custom-transformer');
  });
});
