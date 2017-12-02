import fs from 'fs';

class JSONPerformanceReportParser {
  parse(fileName) {
    const reportFile = JSON.parse(fs.readFileSync(`reports/performance/${fileName}`, 'utf8'));

    const parsedReport = reportFile.log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url
    }));

    if (parsedReport.length > 0) {
      return parsedReport;
    }

    throw Error(`${fileName} contains incorrect data!`);
  }
}

export default JSONPerformanceReportParser;
