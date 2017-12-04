'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getReport = (fileName, path) => {
  return JSON.parse(_fs2.default.readFileSync(`${path}/${fileName}`, 'utf8'));
};

class JSONPerformanceReportParser {
  constructor(path = 'reports/performance') {
    this.path = path;
  }

  parse(fileName) {
    const reportFile = getReport(fileName, this.path);
    const requests = reportFile.log.entries.map(item => ({
      ttfb: item.timings.wait,
      url: item.request.url
    }));

    if (requests.length > 0) {
      return requests;
    }

    throw Error(`${fileName} contains incorrect data!`);
  }
}

exports.default = JSONPerformanceReportParser;