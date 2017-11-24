import fs from 'fs';
import chalk from 'chalk';

class PerformanceReportAnalyser {
  getReport(fileName) {
    return JSON.parse(fs.readFileSync(`reports/performance/${fileName}`, 'utf8'));
  }

  parse(fileName) {
    const reportFile = this.getReport(fileName);

    return reportFile.log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url
    }));
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.parse(fileName);

    if (parsedReport.length > 0) {
      parsedReport.forEach(item => {
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

export default new PerformanceReportAnalyser();
