'use strict';

var _cucumber = require('cucumber');

var _config = require('../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

var _performanceReportParser = require('../helpers/performance-report-parser.helper');

var _performanceReportParser2 = _interopRequireDefault(_performanceReportParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const browsermob = require('browsermob-proxy').Proxy;
const fs = require('fs');
let proxy;

(0, _cucumber.defineSupportCode)(function ({ When, Then }) {
  When(/^I start performance monitor mode$/, function () {
    proxy = new browsermob({
      port: _config2.default.browserMob.serverPort
    });

    let proxyReady = false;
    proxy.start(_config2.default.browserMob.port, (err, data) => {
      if (!err) {
        proxy.startHAR(_config2.default.browserMob.port, 'test', true, true, () => {
          proxyReady = true;
        });
      } else {
        console.error(err);
      }
    });

    browser.driver.wait(() => {
      return proxyReady;
    });
  });

  When(/^I save performance report file as "([^"]*)"$/, function (fileName) {
    const uniqueFileName = `${fileName}-${Date.now()}.har`;
    let proxyDone = false;

    proxy.getHAR(_config2.default.browserMob.port, (err, resp) => {
      if (!err) {
        console.log(`har saved at ${uniqueFileName}`);
        fs.writeFileSync(`reports/performance/${uniqueFileName}`, resp, 'utf8');
      } else {
        console.err('Error getting HAR file: ' + err);
      }
      proxy.stop(_config2.default.browserMob.port, () => {
        proxyDone = true;
      });
    });

    return browser.driver.wait(() => {
      return this.performanceReportFile = uniqueFileName, proxyDone;
    });
  });

  Then(/^the requests should take a maximum of "([^"]*)" milliseconds$/, function (maxTiming) {
    return _performanceReportParser2.default.parse(this.performanceReportFile, maxTiming);
  });
});