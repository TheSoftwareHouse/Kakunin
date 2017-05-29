const pascalConfig = require('../helpers/pascalConfig');
const fs = require('fs');
const path = require('path');
const userProvider = require('../helpers/userProvider');
const fixturesLoader = require('../helpers/fixturesLoader');
const parameters = require('./parameters');
const chalk = require('chalk');
const { defineSupportCode } = require('cucumber');

const report = require('cucumber-html-report');
const outputDir = pascalConfig.projectPath + pascalConfig.reports;
const variableStore = require('../helpers/variableStore');

const createHtmlReport = (sourceJson) => {
  report.create({
    source: sourceJson,
    dest: outputDir,
    name: 'index.html'
  }).then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const logRequestTime = (timeStart) => {
  const timeDiff = process.hrtime(timeStart);

  console.log(chalk.black.bgYellow('Request took ' + (timeDiff[0] + (timeDiff[1] / 1000000000)) + ' seconds'));
};

const takeScreenshot = (scenario, callback) => {
  browser.takeScreenshot().then(function (base64png) {
    scenario.attach(new Buffer(base64png, 'base64'), 'image/png', callback);
  }, function () {
    callback();
  });
};

const clearCookiesAndLocalStorage = (callback) => {
  let cookiesFunc = () => Promise.resolve();

  if (pascalConfig.clearCookiesAfterScenario) {
    cookiesFunc = () => protractor.browser.manage().deleteAllCookies();
  }

  let localStorageFunc = () => Promise.resolve();
  if (pascalConfig.clearLocalStorageAfterScenario) {
    localStorageFunc = () => protractor.browser.executeScript('window.localStorage.clear();');
  }

  cookiesFunc().then(() => {
    localStorageFunc().then(() => {
      protractor.browser.ignoreSynchronization = pascalConfig.type === 'otherWeb';
      callback();
    });
  });
};

const clearDownload = (callback) => {
  const files = fs
    .readdirSync(pascalConfig.projectPath + pascalConfig.downloads)
    .filter(function (file) {
      return file !== '.gitkeep';
    });

  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(pascalConfig.projectPath + pascalConfig.downloads + '/' + files[index]);
  }

  callback();
};

defineSupportCode(({registerHandler, After, Before}) => {
  After(function (scenario, callback) {
    if (scenario.isFailed()) {
      takeScreenshot(this, () => { clearCookiesAndLocalStorage(callback); });
    } else {
      clearCookiesAndLocalStorage(callback);
    }
  });

  Before(function (scenario, callback) {
    this.currentUser = null;

    if (typeof (this.userProvider) === 'undefined') {
      this.userProvider = userProvider;
    }

    variableStore.clearVariables();

    callback();
  });

  Before('@downloadClearBefore', function (scenario, callback) {
    clearDownload(callback);
  });

  After('@downloadClearAfter', function (scenario, callback) {
    clearDownload(callback);
  });

  Before('@reloadFixtures', function (scenario, callback) {
    console.log(chalk.black.bgYellow('Reloading fixtures'));

    const timeStart = process.hrtime();

    fixturesLoader.reloadFixtures(parameters.getReloadFixturesEndpoint()).then(function (response) {
      if (response.status === 200) {
        console.log(chalk.black.bgGreen('Fixtures reloaded'));
      } else {
        console.log(chalk.black.bgRed('There was a problem with fixtures reloading. The response is: '), response);
      }

      logRequestTime(timeStart);

      callback();
    }).catch(function (error) {
      console.log(chalk.black.bgRed('An error occurred during fixtures reloading: '), error);

      logRequestTime(timeStart);

      callback();
    });
  });

  After('@reloadUsers', function (scenario, callback) {
    if (this.currentUser !== null) {
      this.userProvider.lockUser(this.currentUser.account, this.currentUser.type);
    }

    callback();
  });

  registerHandler('AfterFeatures', function (features, callback) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const files = fs.readdirSync(outputDir).filter((file) => file.indexOf('features-report') >= 0);
    const targetJson = path.join(outputDir, 'cucumber_report.json');

    const content = fs.readFileSync(path.join(outputDir, files[0]))

    fs.writeFile(targetJson, content, (err) => {
      fs.unlinkSync(path.join(outputDir, files[0]));
      if (err) {
        console.log('Failed to save cucumber test results to json file.');
        console.log(err);
        callback();
      } else {
        createHtmlReport(targetJson);
        callback();
      }
    });
  });

  protractor.browser.ignoreSynchronization = pascalConfig.type === 'otherWeb';
})
