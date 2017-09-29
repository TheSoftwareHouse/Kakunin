'use strict';

var _config = require('../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _userProvider = require('../helpers/user-provider.helper');

var _userProvider2 = _interopRequireDefault(_userProvider);

var _fixturesLoader = require('../helpers/fixtures-loader.helper');

var _fixturesLoader2 = _interopRequireDefault(_fixturesLoader);

var _parameters = require('./parameters');

var _parameters2 = _interopRequireDefault(_parameters);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cucumber = require('cucumber');

var _cucumberHtmlReport = require('cucumber-html-report');

var _cucumberHtmlReport2 = _interopRequireDefault(_cucumberHtmlReport);

var _variableStore = require('../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const outputDir = _config2.default.projectPath + _config2.default.reports;

const createHtmlReport = sourceJson => {
  _cucumberHtmlReport2.default.create({
    source: sourceJson,
    dest: outputDir,
    name: 'index.html'
  }).then(res => console.log(res)).catch(err => console.log(err));
};

const logRequestTime = timeStart => {
  const timeDiff = process.hrtime(timeStart);

  console.log(_chalk2.default.black.bgYellow('Request took ' + (timeDiff[0] + timeDiff[1] / 1000000000) + ' seconds'));
};

const takeScreenshot = scenario => {
  return browser.takeScreenshot().then(function (base64png) {
    scenario.attach(new Buffer(base64png, 'base64'), 'image/png');
    return Promise.resolve();
  }, function () {
    return Promise.resolve();
  });
};

const clearCookiesAndLocalStorage = callback => {
  let cookiesFunc = () => Promise.resolve();

  if (_config2.default.clearCookiesAfterScenario) {
    cookiesFunc = () => protractor.browser.manage().deleteAllCookies();
  }

  let localStorageFunc = () => Promise.resolve();
  if (_config2.default.clearLocalStorageAfterScenario) {
    localStorageFunc = () => protractor.browser.executeScript('window.localStorage.clear();');
  }

  cookiesFunc().then(() => {
    localStorageFunc().then(() => {
      protractor.browser.ignoreSynchronization = _config2.default.type === 'otherWeb';
      callback();
    });
  });
};

const clearDownload = callback => {
  const files = _fs2.default.readdirSync(_config2.default.projectPath + _config2.default.downloads).filter(function (file) {
    return file !== '.gitkeep';
  });

  for (let index = 0; index < files.length; index++) {
    _fs2.default.unlinkSync(_config2.default.projectPath + _config2.default.downloads + '/' + files[index]);
  }

  callback();
};

(0, _cucumber.defineSupportCode)(({ AfterAll, After, Before }) => {
  After(function (scenario, callback) {
    if (scenario.result.status !== 'passed') {
      takeScreenshot(this).then(() => {
        clearCookiesAndLocalStorage(callback);
      });
    } else {
      clearCookiesAndLocalStorage(callback);
    }
  });

  Before(function (scenario, callback) {
    this.currentUser = null;

    if (typeof this.userProvider === 'undefined') {
      this.userProvider = _userProvider2.default;
    }

    _variableStore2.default.clearVariables();

    callback();
  });

  Before('@downloadClearBefore', function (scenario, callback) {
    clearDownload(callback);
  });

  After('@downloadClearAfter', function (scenario, callback) {
    clearDownload(callback);
  });

  Before('@reloadFixtures', function (scenario, callback) {
    console.log(_chalk2.default.black.bgYellow('Reloading fixtures'));

    const timeStart = process.hrtime();

    _fixturesLoader2.default.reloadFixtures(_parameters2.default.getReloadFixturesEndpoint()).then(function (response) {
      if (response.status === 200) {
        console.log(_chalk2.default.black.bgGreen('Fixtures reloaded'));
      } else {
        console.log(_chalk2.default.black.bgRed('There was a problem with fixtures reloading. The response is: '), response);
      }

      logRequestTime(timeStart);

      callback();
    }).catch(function (error) {
      console.log(_chalk2.default.black.bgRed('An error occurred during fixtures reloading: '), error);

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

  AfterAll(function (callback) {
    if (!_fs2.default.existsSync(outputDir)) {
      _fs2.default.mkdirSync(outputDir);
    }

    const files = _fs2.default.readdirSync(outputDir).filter(file => file.indexOf('features-report') >= 0);
    const targetJson = _path2.default.join(outputDir, 'cucumber_report.json');

    const content = _fs2.default.readFileSync(_path2.default.join(outputDir, files[0]));

    _fs2.default.writeFile(targetJson, content, err => {
      _fs2.default.unlinkSync(_path2.default.join(outputDir, files[0]));
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

  protractor.browser.ignoreSynchronization = _config2.default.type === 'otherWeb';
});