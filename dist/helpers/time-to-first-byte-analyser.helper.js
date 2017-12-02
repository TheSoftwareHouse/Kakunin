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

  analyseTTFB(parsedReport, maxTiming) {
    return parsedReport.filter(parsedReport => parsedReport.ttfb > maxTiming);
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    return this.analyseTTFB(parsedReport, maxTiming);
  }
}

const analyser = exports.analyser = new TimeToFirstByteAnalyser(new _JSONPerformanceReportParser2.default());