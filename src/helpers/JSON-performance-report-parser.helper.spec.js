import JSONPerformanceReportParser from './JSON-performance-report-parser.helper';
import { expect } from 'chai';
import fs from 'fs';

const parser = new JSONPerformanceReportParser();

describe('JSON performance report parser', () => {
  it('returns found objects with TTFB and URL values', (fileName = 'performance-report.har') => {
    const parsedReport = JSON.parse(fs.readFileSync(`src/tests/reports/performance/${fileName}`, 'utf8'));

    expect(parser.mapRequests(parsedReport, fileName)).to.deep.include({ ttfb: 0, url: 'http://localhost:8080/' });
  });

  it('returns error message - file contains incorrect data', (fileName = 'incorrect-performance-report.har') => {
    const parsedIncorrectReport = JSON.parse(fs.readFileSync(`src/tests/reports/performance/${fileName}`, 'utf8'));

    expect(() => parser.mapRequests(parsedIncorrectReport, fileName)).to.throw(`${fileName} contains incorrect data!`);
  });
});
