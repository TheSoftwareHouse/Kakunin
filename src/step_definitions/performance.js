import { defineSupportCode } from 'cucumber';
import chalk from 'chalk';
import config from '../core/config.helper';
import { create as createAnalyser } from '../web/performance/time-to-first-byte-analyser.helper';

const analyser = createAnalyser();
const Browsermob = require('browsermob-proxy').Proxy;
const fs = require('fs');
let proxy;

defineSupportCode(function({ When, Then }) {
  When(/^I start performance monitor mode$/, function() {
    proxy = new Browsermob({
      port: config.browserMob.serverPort,
    });

    let proxyReady = false;
    proxy.start(config.browserMob.port, err => {
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

  When(/^I save performance report file as "([^"]*)"$/, function(fileName) {
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
      this.performanceReportFile = uniqueFileName;
      return proxyDone;
    });
  });

  Then(/^the requests should take a maximum of "([^"]*)" milliseconds$/, function(maxTiming) {
    try {
      const slowRequests = analyser.checkTiming(this.performanceReportFile, parseFloat(maxTiming));

      if (slowRequests.length > 0) {
        slowRequests.forEach(({ url, ttfb }) => {
          console.log(
            chalk.white.bgRed(
              '\r\n',
              'Slow request:',
              '\r\n',
              `URL: ${url}`,
              '\r\n',
              `TTFB: ${ttfb.toFixed(2)} ms`,
              '\r\n'
            )
          );
        });

        return Promise.reject('TTFB value is too big! Details available above.');
      }

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });
});
