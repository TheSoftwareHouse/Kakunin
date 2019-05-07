import * as fs from 'fs';

const getReport = (fileName, path) => {
  return JSON.parse(fs.readFileSync(`${path}/${fileName}`, 'utf8'));
};

class JSONPerformanceReportParser {
  private readonly path: string;

  constructor(path = 'reports/performance') {
    this.path = path;
  }

  public parse(fileName) {
    const reportFile = getReport(fileName, this.path);
    const requests = reportFile.log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url,
    }));

    if (requests.length > 0) {
      return requests;
    }

    throw Error(`${fileName} contains incorrect data!`);
  }
}

export default JSONPerformanceReportParser;
