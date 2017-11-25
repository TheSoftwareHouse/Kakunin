import performanceReportAnalyser from './performance-report-analyser.helper';
import chai from 'chai';

const expect = chai.expect;

describe('Performance report analyser', () => {
  it('returns error message if a file does not exist', () => {
    expect(() => performanceReportAnalyser.getReport('not-existing-report'))
      .to.throw(`ENOENT: no such file or directory, open 'reports/performance/not-existing-report'`);
  });
});
