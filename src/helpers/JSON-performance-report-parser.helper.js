import fs from 'fs';

class JSONPerformanceReportParser {
  parse(fileName) {
    const reportFile = JSON.parse(fs.readFileSync(`reports/performance/${fileName}`, 'utf8'));

    return reportFile.log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url
    }));
  }
}

export default JSONPerformanceReportParser;
