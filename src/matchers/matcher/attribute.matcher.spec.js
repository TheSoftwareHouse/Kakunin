import { attributeMatcher } from './attribute.matcher';
import { expect } from 'chai';
import { regexBuilder } from './regex-matcher/regex-builder';

describe('Attribute matcher', () => {
  it('is satisfied when the prefix and name are correct', () => {
    expect(attributeMatcher.isSatisfiedBy('attribute', 'class:some-url-regex')).to.equal(true);
  });

  it('is not satisfied when the prefix and name are incorrect', () => {
    const incorrectParameters = [
      { prefix: 'f'},
      { prefix: 'incorrect'},
      { prefix: 'g'}
    ];

    incorrectParameters.forEach(parameters => expect(attributeMatcher
      .isSatisfiedBy(parameters.prefix, parameters.name)).to.equal(false));
  });

  it('returns true when the attribute is matched', (done) => {
    const elementMocked = {
      getAttribute: () => Promise.resolve('http://some-random-link.com')
    };

    attributeMatcher.match(elementMocked, 'href', 'someRandomLinkRegex').then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns rejected promise when the attribute is not matched', (done) => {
    const elementMocked = {
      getAttribute: () => Promise.resolve('some-random-link'),
      locator: () => 'some-locator'
    };

    attributeMatcher.match(elementMocked, 'href' ,'someRandomLinkRegex').catch(err => {
      done();
    })
  });
});
