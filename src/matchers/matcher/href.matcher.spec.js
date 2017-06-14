import hrefMatcher from './href.matcher';
import { expect } from 'chai';

describe('Href matcher', () => {
  it('is satisfied when the prefix and name are correct', () => {
    expect(hrefMatcher.isSatisfiedBy('f:', 'href:some-url-regex')).to.equal(true);
  });

  it('is not satisfied when the prefix and name are incorrect', () => {
    const incorrectParameters = [
      { prefix: 'f:', name: 'invisible'},
      { prefix: 'g:', name: 'href'},
      { prefix: 'f:', name: 'href-some-incorrect value'}
    ];

    incorrectParameters.forEach(parameters => expect(hrefMatcher
      .isSatisfiedBy(parameters.prefix, parameters.name)).to.equal(false));
  });

  it('returns true when the attribute is matched', (done) => {
    const elementMocked = {
      getAttribute: () => Promise.resolve('http://some-random-link.com')
    };

    hrefMatcher.match(elementMocked, 'f:href:someRandomLinkRegex').then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns false when the attribute is not matcher', (done) => {
    const elementMocked = {
      getAttribute: () => Promise.resolve('some-random-link')
    };

    hrefMatcher.match(elementMocked, 'f:href:someRandomLinkRegex').then(result => {
      expect(result).to.equal(false);
      done();
    });
  });
});
