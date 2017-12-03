'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _JSONPerformanceReportParser = require('./JSON-performance-report-parser.helper');

class TimeToFirstByteAnalyser {
  constructor(jsonPerformanceReportParser) {
    this.reader = jsonPerformanceReportParser;
  }

  checkTiming(fileName, maxTiming) {
    const parsedReport = this.reader.parse(fileName);

    return parsedReport.filter(parsedReport => parsedReport.ttfb > maxTiming);
  }
}

const create = exports.create = (reportParser = (0, _JSONPerformanceReportParser.parser)()) => new TimeToFirstByteAnalyser(reportParser);