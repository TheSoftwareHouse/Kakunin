import JSONPerformanceReportParser from './JSON-performance-report-parser.helper';

const parser = new JSONPerformanceReportParser('src/tests/reports/performance');

describe('JSON performance report parser', () => {
  it('returns found objects with TTFB and URL values', (fileName = 'performance-report.har') => {

    expect(parser.parse(fileName, fileName)).toContainEqual({ttfb: 0, url: 'http://localhost:8080/'});
  });

  it('returns error message - file contains incorrect data', (fileName = 'incorrect-performance-report.har') => {

    expect(() => parser.parse(fileName, fileName)).toThrow(`${fileName} contains incorrect data!`);
  });
});
