import { create as createAnalyser } from './time-to-first-byte-analyser.helper';
import { expect } from 'chai';

const myFakeParser = {
  parse: () => {
    return [{ttfb: 0, url: 'http://localhost:8080/'},
      {ttfb: 2, url: 'http://localhost:8080/assets/kittens.jpg'},
      {ttfb: 1, url: 'http://localhost:8080/favicon.ico'},
      {ttfb: 2, url: 'http://localhost:8080/tabular-data'},
      {ttfb: 1, url: 'http://localhost:8080/assets/kittens.jpg'}]
  }
};
const analyser = createAnalyser(myFakeParser);

describe('Time to first byte analyser', () => {
  it('returns found slow request', () => {
    const maxTiming = 0; // equal to the lowest request's TTFB value

    expect(analyser.checkTiming(myFakeParser, maxTiming)).to.deep.include({ttfb: 2, url: 'http://localhost:8080/assets/kittens.jpg'});
  });

  it('returns empty array - no slow requests', () => {
    const maxTiming = 1000; // bigger than the highest request's TTFB value

    expect(analyser.checkTiming(myFakeParser, maxTiming)).to.deep.equal([]);
  });
});
