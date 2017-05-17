const pascalConfig = require('../helpers/pascalConfig');
const fs = require('fs');
const userProvider = require('../helpers/userProvider');
const fixturesLoader = require('../helpers/fixturesLoader');
const parameters = require('./parameters');
const chalk = require('chalk');
const Cucumber = require('cucumber');
const report = require('cucumber-html-report');
const outputDir = pascalConfig.projectPath + pascalConfig.reports;
const variableStore = require('../helpers/variableStore');

const createHtmlReport = function (sourceJson) {
  report.create({
    source: sourceJson,
    dest: outputDir,
    name: 'index.html'
  }).then(console.log)
    .catch(console.error);
};

const JsonFormatter = Cucumber.Listener.JsonFormatter();
JsonFormatter.log = function (string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const targetJson = outputDir + '/cucumber_report.json';
  fs.writeFile(targetJson, string, function (err) {
    if (err) {
      console.log('Failed to save cucumber test results to json file.');
      console.log(err);
    } else {
      createHtmlReport(targetJson);
    }
  });
};

function logRequestTime(timeStart) {
  const timeDiff = process.hrtime(timeStart);

  console.log(chalk.black.bgYellow('Request took ' + (timeDiff[0] + timeDiff[1] / 1000000000) + ' seconds'));
}

function takeScreenshot(scenario, callback) {
  browser.takeScreenshot().then(function (base64png) {
    scenario.attach(new Buffer(base64png, 'base64'), 'image/png', callback);
  }, function (error) {
    callback();
  });
}

function clearCookiesAndLocalStorage(callback) {
  let cookiesFunc = () => Promise.resolve();
  if (pascalConfig.clearCookiesAfterScenario) {
    cookiesFunc = () => protractor.browser.manage().deleteAllCookies();
  }

  let localStorageFunc = () => Promise.resolve();
  if (pascalConfig.clearLocalStorageAfterScenario) {
    localStorageFunc = () => protractor.browser.executeScript('window.localStorage.clear();');
  }

  cookiesFunc()
    .then(function () {
      localStorageFunc().then(function () {
        protractor.browser.ignoreSynchronization = pascalConfig.type === 'otherWeb';
        callback();
      });
    });
}

function clearDownload(callback) {
  const files = fs.readdirSync(pascalConfig.projectPath + pascalConfig.downloads).filter(function (file) {
    return file !== '.gitkeep';
  });

  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(pascalConfig.projectPath + pascalConfig.downloads + '/' + files[index]);
  }

  callback();
}

module.exports = function () {
  this.After(function (scenario, callback) {
    if (scenario.isFailed()) {
      takeScreenshot(scenario, () => { clearCookiesAndLocalStorage(callback); });
    } else {
      clearCookiesAndLocalStorage(callback);
    }
  });

  this.Before(function (scenario, callback) {
    this.currentUser = null;

    if (typeof (this.userProvider) === 'undefined') {
      this.userProvider = userProvider;
    }

    variableStore.clearVariables();

    callback();
  });

  this.Before('@downloadClearBefore', function (scenario, callback) {
    clearDownload(callback);
  });

  this.After('@downloadClearAfter', function (scenario, callback) {
    clearDownload(callback);
  });

  this.Before('@reloadFixtures', function (scenario, callback) {
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

  this.After('@reloadUsers', function (scenario, callback) {
    if (this.currentUser !== null) {
      this.userProvider.lockUser(this.currentUser.account, this.currentUser.type);
    }

    callback();
  });

  this.registerListener(JsonFormatter);

  protractor.browser.ignoreSynchronization = pascalConfig.type === 'otherWeb';
};
