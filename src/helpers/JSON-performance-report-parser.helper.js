import fs from 'fs';

class JSONPerformanceReportParser {
  mapRequests(parsedReport, fileName) {
    const requests = parsedReport.log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url
    }));

    if (requests.length > 0) {
      return requests;
    }

    throw Error(`${fileName} contains incorrect data!`);
  }

  parse(fileName) {
    const reportFile = JSON.parse(fs.readFileSync(`reports/performance/${fileName}`, 'utf8'));

    return this.mapRequests(reportFile, fileName);
  }
}

export default JSONPerformanceReportParser;
