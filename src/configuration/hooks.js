import config from '../helpers/config.helper';
import fs from 'fs';
import path from 'path';
import userProvider from '../helpers/user-provider.helper';
import fixturesLoader from '../helpers/fixtures-loader.helper';
import parameters from './parameters';
import chalk from 'chalk';
import { defineSupportCode } from 'cucumber';
import variableStore from '../helpers/variable-store.helper';

const logRequestTime = timeStart => {
  const timeDiff = process.hrtime(timeStart);

  console.log(chalk.black.bgYellow('Request took ' + (timeDiff[0] + timeDiff[1] / 1000000000) + ' seconds'));
};

const takeScreenshot = scenario => {
  return browser.takeScreenshot().then(
    function(base64png) {
      scenario.attach(new Buffer(base64png, 'base64'), 'image/png');
      return Promise.resolve();
    },
    function() {
      return Promise.resolve();
    }
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

const clearDownload = callback => {
  const files = fs.readdirSync(path.join(config.projectPath, config.downloads)).filter(function(file) {
    return file !== '.gitkeep';
  });

  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(path.join(config.projectPath, config.downloads, files[index]));
  }

  callback();
};

defineSupportCode(({ After, Before }) => {
  After(function(scenario, callback) {
    if (scenario.result.status !== 'passed') {
      takeScreenshot(this).then(() => {
        clearCookiesAndLocalStorage(callback);
      });
    } else {
      clearCookiesAndLocalStorage(callback);
    }
  });

  Before(function(scenario, callback) {
    this.currentUser = null;

    if (typeof this.userProvider === 'undefined') {
      this.userProvider = userProvider;
    }

    variableStore.clearVariables();

    callback();
  });

  Before('@downloadClearBefore', function(scenario, callback) {
    clearDownload(callback);
  });

  After('@downloadClearAfter', function(scenario, callback) {
    clearDownload(callback);
  });

  Before('@reloadFixtures', function(scenario, callback) {
    console.log(chalk.black.bgYellow('Reloading fixtures'));

    const timeStart = process.hrtime();

    fixturesLoader
      .reloadFixtures(parameters.getReloadFixturesEndpoint())
      .then(function(response) {
        if (response.status === 200) {
          console.log(chalk.black.bgGreen('Fixtures reloaded'));
        } else {
          console.log(chalk.black.bgRed('There was a problem with fixtures reloading. The response is: '), response);
        }

        logRequestTime(timeStart);

        callback();
      })
      .catch(function(error) {
        console.log(chalk.black.bgRed('An error occurred during fixtures reloading: '), error);

        logRequestTime(timeStart);

        callback();
      });
  });

  After('@reloadUsers', function(scenario, callback) {
    if (this.currentUser !== null) {
      this.userProvider.lockUser(this.currentUser.account, this.currentUser.type);
    }

    callback();
  });

  protractor.browser.ignoreSynchronization = config.type === 'otherWeb';
});
