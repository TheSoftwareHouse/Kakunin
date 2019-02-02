import JSONPerformanceReportParser from './JSON-performance-report-parser.helper';

class TimeToFirstByteAnalyser {
  private reader: any;

  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  public checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    return parsedReport.filter(report => report.ttfb > maxTiming);
  }
}

export const create = (reportParser = new JSONPerformanceReportParser()) => new TimeToFirstByteAnalyser(reportParser);
