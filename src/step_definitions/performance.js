import { defineSupportCode } from 'cucumber';
import config from '../helpers/config.helper';
import performanceReportParser from '../helpers/performance-report-parser.helper';

const browsermob = require('browsermob-proxy').Proxy;
const fs = require('fs');
let proxy;

defineSupportCode(function ({ When, Then }) {
  When(/^I start performance monitor mode$/, function () {
    proxy = new browsermob({
      port: config.browserMob.serverPort
    });

    let proxyReady = false;
    proxy.start(config.browserMob.port, (err, data) => {
      if (!err) {
        proxy.startHAR(config.browserMob.port, 'test', true, true, () => {
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

    proxy.getHAR(config.browserMob.port, (err, resp) => {
      if (!err) {
        console.log(`har saved at ${uniqueFileName}`);
        fs.writeFileSync(`reports/performance/${uniqueFileName}`, resp, 'utf8');
      } else {
        console.err('Error getting HAR file: ' + err);
      }
      proxy.stop(config.browserMob.port, () => {
        proxyDone = true;
      });
    });

    return browser.driver.wait(() => {
      return (
        this.performanceReportFile = uniqueFileName,
        proxyDone
      )
    });
  });

  Then(/^the requests should take a maximum of "([^"]*)" milliseconds$/, function (maxTiming) {
    return performanceReportParser.parse(this.performanceReportFile, maxTiming);
  });
});
