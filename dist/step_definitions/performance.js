'use strict';

var _cucumber = require('cucumber');

var _config = require('../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const browsermob = require('browsermob-proxy').Proxy;
const fs = require('fs');
let proxy;

(0, _cucumber.defineSupportCode)(function ({ When }) {
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
    let proxyDone = false;

    proxy.getHAR(_config2.default.browserMob.port, (err, resp) => {
      if (!err) {
        console.log(`har saved at ${fileName}.har`);
        fs.writeFileSync(`reports/performance/${fileName}-${Date.now()}.har`, resp, 'utf8');
      } else {
        console.err('Error getting HAR file: ' + err);
      }
      proxy.stop(_config2.default.browserMob.port, () => {
        proxyDone = true;
      });
    });

    return browser.driver.wait(() => {
      return proxyDone;
    });
  });
});