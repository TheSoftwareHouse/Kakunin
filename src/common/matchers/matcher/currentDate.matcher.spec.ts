import { currentDateMatcher } from './currentDate.matcher';
import * as moment from 'moment';

describe('Current Date matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(currentDateMatcher.isSatisfiedBy('f', 'currentDate')).toEqual(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'm', name: 'date' },
      { prefix: 't', name: 'currentDate' },
    ];
    incorrectParameters.forEach((parameter) =>
      expect(currentDateMatcher.isSatisfiedBy(parameter.prefix, parameter.name)).toEqual(false)
    );
  });

  it('returns true when the date is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(moment(new Date())),
      locator: () => 'some-locator',
    };

    currentDateMatcher.match(elementMocked).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when the date with slashes is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(moment(new Date()).format('MM/DD/YYYY')),
      locator: () => 'some-locator',
    };

    currentDateMatcher.match(elementMocked, null, 'MM/DD/YYYY').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when the text date is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('Yesterday'),
      locator: () => 'some-locator',
    };

    currentDateMatcher.match(elementMocked).catch((err) => {
      done();
    });
  });
  it('returns rejected promise when the date is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('1900-01-01'),
      locator: () => 'some-locator',
    };

    currentDateMatcher.match(elementMocked).catch((err) => {
      done();
    });
  });

  it('returns rejected promise when the date is incorrect', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('1900-01-1900'),
      locator: () => 'some-locator',
    };

    currentDateMatcher.match(elementMocked).catch((err) => {
      done();
    });
  });
});
