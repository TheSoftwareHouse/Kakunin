import regexBuilder from './regex-builder';
import { expect } from 'chai';

describe('Regex builder', () => {
  it('throws an error when could not build a regexp', () => {
    expect(() => regexBuilder.buildRegex('r:unknown-regexp'))
      .to.throw('Regex with template r:unknown-regexp was not found');
  });

  it('returns regular expression object', () => {
    expect(regexBuilder.buildRegex('r:number')).to.eql(new RegExp('[0-9]+'));
  });
});
