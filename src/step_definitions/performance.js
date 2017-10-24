import { defineSupportCode } from 'cucumber';
import config from '../helpers/config.helper';

const browsermob = require('browsermob-proxy').Proxy;
const fs = require('fs');
let proxy;

defineSupportCode(function ({ When }) {
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
    let proxyDone = false;

    proxy.getHAR(config.browserMob.port, (err, resp) => {
      if (!err) {
        console.log('har saved at output.har');
        fs.writeFileSync(`reports/performance/${fileName}-${Date.now()}.har`, resp, 'utf8');
      } else {
        console.err('Error getting HAR file: ' + err);
      }
      proxy.stop(config.browserMob.port, () => {
        proxyDone = true;
      });
    });

    return browser.driver.wait(() => {
      return proxyDone;
    });
  });
});
