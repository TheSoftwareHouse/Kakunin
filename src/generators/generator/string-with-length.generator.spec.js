import { stringWithLengthGenerator } from './string-with-length.generator';

describe('String with length', () => {
  it('returns true if is satisfied by', () => {
    expect(stringWithLengthGenerator.isSatisfiedBy('stringWithLength')).toEqual(true);
  });

  it('returns false if is not satisfied by', () => {
    expect(stringWithLengthGenerator.isSatisfiedBy('not-supported-name')).toEqual(false);
  });

  it('generates string with given length', done => {
    stringWithLengthGenerator.generate(100).then(result => {
      expect(result.length).toEqual(100);
      done();
    });
  });
});
