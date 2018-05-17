import { currentDateMatcher } from './currentDate.matcher';
import Sugar from 'sugar-date';
import { expect } from 'chai';

describe('Current Date matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(currentDateMatcher.isSatisfiedBy('f', 'currentDate')).to.equal(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'm', name: 'date' },
      { prefix: 't', name: 'currentDate' },
    ];
    incorrectParameters.forEach((parameter) => expect(
      currentDateMatcher.isSatisfiedBy(parameter.prefix, parameter.name)).
      to.
      equal(false));
  });

  it('returns true when the text date is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('Today'),
    };

    currentDateMatcher.match(elementMocked).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns true when the date is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(Sugar.Date.create('now')),
    };

    currentDateMatcher.match(elementMocked).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns true when the date with slashes is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(Sugar.Date.format(Sugar.Date.create('now'), '{MM}/{dd}/{yyyy}')),
    };

    currentDateMatcher.match(elementMocked, '{MM}/{dd}/{yyyy}').then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns false when the text date is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('Yesterday'),
    };

    currentDateMatcher.match(elementMocked).then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });
  it('returns false when the date is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('1900-01-01'),
    };

    currentDateMatcher.match(elementMocked).then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });

  it('returns false when the date is incorrect', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('1900-01-1900'),
    };

    currentDateMatcher.match(elementMocked).then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });
});
