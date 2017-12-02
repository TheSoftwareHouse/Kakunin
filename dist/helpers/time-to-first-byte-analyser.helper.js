'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyser = undefined;

var _JSONPerformanceReportParser = require('./JSON-performance-report-parser.helper');

var _JSONPerformanceReportParser2 = _interopRequireDefault(_JSONPerformanceReportParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TimeToFirstByteAnalyser {
  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    if (parsedReport.length > 0) {
      return parsedReport.filter(parsedReport => parsedReport.ttfb > maxTiming);
    }

    throw Error(`${fileName} contains incorrect data`);
  }
}

const analyser = exports.analyser = new TimeToFirstByteAnalyser(new _JSONPerformanceReportParser2.default());