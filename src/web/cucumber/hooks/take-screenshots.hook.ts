import { HookHandler } from './hook.interface';
import config from '../../../core/config.helper';
import { After } from 'cucumber';

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
  public initializeHook() {
    return After(function(scenario, callback) {
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
    return 1;
  }
}

export const takeScreenshotHook = new TakeScreenshotHook();
