import * as chalk from 'chalk';
import { When, Then } from 'cucumber';
import config from '../../core/config.helper';
import { create as createAnalyser } from '../performance/time-to-first-byte-analyser.helper';
import * as fs from 'fs';
import { Proxy as Browsermob } from 'browsermob-proxy';

const analyser = createAnalyser();
let proxy;

When(/^I start performance monitor mode$/, () => {
  proxy = new Browsermob({
    port: config.browserMob.serverPort,
  });

  let proxyReady = false;
  proxy.start(config.browserMob.port, (err) => {
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
    this.performanceReportFile = uniqueFileName;
    return proxyDone;
  });
});

Then(/^the requests should take a maximum of "([^"]*)" milliseconds$/, function (maxTiming) {
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
