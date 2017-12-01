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

    console.log(`${fileName} contains incorrect data!`);
    return null;
  }
}

export const analyser = new TimeToFirstByteAnalyser(new JSONPerformanceReportParser());
