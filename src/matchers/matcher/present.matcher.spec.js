import { presentMatcher } from './present.matcher';
import { expect } from 'chai';

describe('Present matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(presentMatcher.isSatisfiedBy('f', 'isPresent')).to.equal(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'f', name: 'isVisible'},
      { prefix: 'r', name: 'isPresent'}
    ];

    incorrectParameters.forEach((parameter) => expect(presentMatcher
      .isSatisfiedBy(parameter.prefix, parameter.name)).to.equal(false));
  });

  it('returns true when the element is present', (done) => {
    const mockedElement = {
      isPresent: () => Promise.resolve(),
      locator: () => 'some-locator'
    };

    presentMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns false when the element is not present', (done) => {
    const mockedElement = {
      isPresent: () => Promise.reject(),
      locator: () => 'some-locator'
    };

    presentMatcher.match(mockedElement).catch((err) => {
      done();
    });
  });
});
