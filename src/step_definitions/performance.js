import { defineSupportCode } from 'cucumber';
import chalk from 'chalk';
import config from '../helpers/config.helper';
import { analyser } from '../helpers/time-to-first-byte-analyser.helper';

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
    const slowRequests = analyser.checkTiming(this.performanceReportFile, maxTiming);

    if (slowRequests.length > 0) {
      slowRequests.forEach(item => {
        console.log(chalk.white.bgRed('\r\n', `Slow request:`, '\r\n', `URL: ${item.url}`, '\r\n', `TTFB: ${item.ttfb.toFixed(2)} ms`, '\r\n'));
      });

      return Promise.reject('TTFB value is too big! Details available above.');
    }

    return Promise.resolve();
  });
});
