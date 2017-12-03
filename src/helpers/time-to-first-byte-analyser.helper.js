import { parser as pathParser } from './JSON-performance-report-parser.helper';

class TimeToFirstByteAnalyser {
  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    return parsedReport.filter(parsedReport => parsedReport.ttfb > maxTiming);
  }
}

export const create = (reportParser = pathParser()) => new TimeToFirstByteAnalyser(reportParser);
