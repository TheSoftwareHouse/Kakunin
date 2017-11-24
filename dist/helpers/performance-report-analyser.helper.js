'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PerformanceReportAnalyser {
  getReport(fileName) {
    return JSON.parse(_fs2.default.readFileSync(`reports/performance/${fileName}`, 'utf8'));
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
          console.log(_chalk2.default.white.bgRed('\r\n', `Slow request:`, '\r\n', `URL: ${item.url}`, '\r\n', `TTFB: ${item.ttfb.toFixed(2)} ms`, '\r\n'));
          return Promise.reject('TTFB value is too big! Details available above.');
        }
      });

      return Promise.resolve();
    }

    return Promise.reject(`${fileName} report contains incorrect data!`);
  }
}

exports.default = new PerformanceReportAnalyser();