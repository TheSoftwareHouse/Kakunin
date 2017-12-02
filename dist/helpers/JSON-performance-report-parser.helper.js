'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JSONPerformanceReportParser {
  parse(fileName) {
    const reportFile = JSON.parse(_fs2.default.readFileSync(`reports/performance/${fileName}`, 'utf8'));

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

exports.default = JSONPerformanceReportParser;