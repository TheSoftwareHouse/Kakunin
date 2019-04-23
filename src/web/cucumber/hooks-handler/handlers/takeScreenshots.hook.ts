import { After } from 'cucumber';
import { HookHandler } from '../hook-handler.interface';
import config from '../../../../core/config.helper';

const takeScreenshot = scenario => {
  return browser.takeScreenshot().then(
    base64png => {
      scenario.attach(new Buffer(base64png, 'base64'), 'image/png');
      return Promise.resolve();
    },
    () => Promise.resolve()
  );
};

const clearCookiesAndLocalStorage = callback => {
  let cookiesFunc = () => Promise.resolve(true);

  if (config.clearCookiesAfterScenario) {
    cookiesFunc = () => protractor.browser.manage().deleteAllCookies();
  }

  let localStorageFunc = () => Promise.resolve(true);
  if (config.clearLocalStorageAfterScenario) {
    localStorageFunc = () => protractor.browser.executeScript('window.localStorage.clear();');
  }

  browser
    .wait(
      cookiesFunc()
        .then(localStorageFunc)
        .catch(() => false),
      config.waitForPageTimeout * 1000
    )
    .then(() => {
      protractor.browser.ignoreSynchronization = config.type === 'otherWeb';
      callback();
    });
};

class TakeScreenshotHook implements HookHandler {
  public handleHook() {
    After(function(scenario, callback) {
      if (scenario.result.status !== 'passed') {
        takeScreenshot(this).then(() => {
          clearCookiesAndLocalStorage(callback);
        });
      } else {
        clearCookiesAndLocalStorage(callback);
      }
    });
  }

  public getPriority() {
    return 998;
  }
}

export const takeScreenshotHook = new TakeScreenshotHook();
