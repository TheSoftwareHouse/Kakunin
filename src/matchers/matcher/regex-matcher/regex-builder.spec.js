import { regexBuilder } from './regex-builder';

describe('Regex builder', () => {
  it('throws an error when could not build a regexp', () => {
    expect(() => regexBuilder.buildRegex('r:unknown-regexp')).toThrow(
      'Regex with template r:unknown-regexp was not found'
    );
  });

  it('returns regular expression object', () => {
    expect(regexBuilder.buildRegex('r:number')).toEqual(new RegExp('[0-9]+'));
  });
});
