import JSONPerformanceReportParser from './JSON-performance-report-parser.helper';

class TimeToFirstByteAnalyser {
  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    if (parsedReport.length > 0) {
      return parsedReport.filter(parsedReport => parsedReport.ttfb > maxTiming);
    }

    throw Error(`${fileName} contains incorrect data`);
  }
}

export const analyser = new TimeToFirstByteAnalyser(new JSONPerformanceReportParser());
