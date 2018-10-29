'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _JSONPerformanceReportParser = require('./JSON-performance-report-parser.helper');

var _JSONPerformanceReportParser2 = _interopRequireDefault(_JSONPerformanceReportParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TimeToFirstByteAnalyser {
  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    return parsedReport.filter(report => report.ttfb > maxTiming);
  }
}

const create = exports.create = (reportParser = new _JSONPerformanceReportParser2.default()) => new TimeToFirstByteAnalyser(reportParser);