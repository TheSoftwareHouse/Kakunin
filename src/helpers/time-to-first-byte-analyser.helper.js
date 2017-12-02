import JSONPerformanceReportParser from './JSON-performance-report-parser.helper';

class TimeToFirstByteAnalyser {
  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  analyseTTFB(parsedReport, maxTiming) {
    return parsedReport.filter(parsedReport => parsedReport.ttfb > maxTiming);
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    return this.analyseTTFB(parsedReport, maxTiming);
  }
}

export const analyser = new TimeToFirstByteAnalyser(new JSONPerformanceReportParser());
