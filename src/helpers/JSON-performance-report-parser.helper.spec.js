import { parser as pathParser } from './JSON-performance-report-parser.helper';
import { expect } from 'chai';

const parser = pathParser('src/tests/reports/performance');

describe('JSON performance report parser', () => {
  it('returns found objects with TTFB and URL values', (fileName = 'performance-report.har') => {

    expect(parser.parse(fileName, fileName)).to.deep.include({ttfb: 0, url: 'http://localhost:8080/'});
  });

  it('returns error message - file contains incorrect data', (fileName = 'incorrect-performance-report.har') => {

    expect(() => parser.parse(fileName, fileName)).to.throw(`${fileName} contains incorrect data!`);
  });
});
