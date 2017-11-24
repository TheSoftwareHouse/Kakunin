import fs from 'fs';
import chalk from 'chalk';

class PerformanceReportParse {
  constructor() {
    this.performanceReport = (fileName) => JSON.parse(fs.readFileSync(`reports/performance/${fileName}`, 'utf8'));
  }

  parse(fileName, maxTiming) {
    const mappedRequests = this.performanceReport(fileName).log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url
    }));

    if (mappedRequests.length > 0) {
      mappedRequests.forEach(item => {
        if (item.ttfb > maxTiming) {
          console.log(chalk.white.bgRed('\r\n', `Slow request:`, '\r\n', `URL: ${item.url}`, '\r\n', `TTFB: ${item.ttfb.toFixed(2)} ms`, '\r\n'));
          return Promise.reject('TTFB value is too big! Details available above.');
        }
      });

      return Promise.resolve();
    }

    return Promise.reject(`${fileName} report contains incorrect data!`);
  }
}

export default new PerformanceReportParse();
