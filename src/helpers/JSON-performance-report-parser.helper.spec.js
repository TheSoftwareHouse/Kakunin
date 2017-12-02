import JSONPerformanceReportParser from './JSON-performance-report-parser.helper';
import { expect } from 'chai';

const parser = new JSONPerformanceReportParser();

describe('JSON performance report parser', () => {
  it('returns found objects with TTFB and URL values', () => {
    expect(parser.parse('performance-report.har')).to.deep.include({ ttfb: 0, url: 'http://localhost:8080/' });
  });

  it('returns error message - file contains incorrect data', () => {
    expect(() => parser.parse('incorrect-performance-report.har')).to.throw("incorrect-performance-report.har contains incorrect data!");
  });
});
