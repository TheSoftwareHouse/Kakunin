'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Initializer {
  createProjectDirectory(path) {
    const projectPath = process.cwd() + path;

    (0, _mkdirp2.default)(projectPath);

    console.log(`Created directory at path ${projectPath}`);
  }

  createTemplateFile(path, content) {
    const filePath = process.cwd() + path;

    _fs2.default.writeFileSync(filePath, content);

    console.log(`Created file at path ${filePath}`);
  }

  createTemplateFileWithContentFrom(path, file) {
    const content = _fs2.default.readFileSync(__dirname + '/../templates/' + file);

    this.createTemplateFile(path, content);
  }

  promptFolders(message, defaultValue, type = 'input') {
    return _asyncToGenerator(function* () {
      let fullMessage = message;

      if (defaultValue !== '') {
        fullMessage += ` [${defaultValue}]`;
      }

      return yield _inquirer2.default.prompt([{
        type: type,
        name: 'input',
        message: fullMessage
      }]).then(function (answer) {
        return answer.input === '' ? defaultValue : answer.input;
      });
    })();
  }

  initConfig(advancedConfiguration = false) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const conf = {
        browserWidth: 1600,
        browserHeight: 900,
        timeout: 60,
        intervalEmail: 5,
        maxEmailRepeats: 5,
        elementsVisibilityTimeout: 5,
        waitForPageTimeout: 5,
        downloadTimeout: 30,
        emails: ['/emails'],
        reports: '/reports',
        downloads: '/downloads',
        data: '/data',
        features: ['/features'],
        pages: ['/pages'],
        matchers: ['/matchers'],
        generators: ['/generators'],
        form_handlers: ['/form_handlers'],
        step_definitions: ['/step_definitions'],
        comparators: ['/comparators'],
        dictionaries: ['/dictionaries'],
        transformers: ['/transformers'],
        regexes: ['/regexes'],
        hooks: ['/hooks'],
        clearEmailInboxBeforeTests: false,
        clearCookiesAfterScenario: true,
        clearLocalStorageAfterScenario: true,
        email: null,
        headless: false,
        noGpu: false
      };

      yield _inquirer2.default.prompt([{
        type: 'rawlist',
        name: 'type',
        message: 'What kind of application would you like to test?',
        choices: [{ name: 'Angular 1', value: 'ng1' }, { name: 'Angular 2', value: 'ng2' }, { name: 'Other web app (e.g. React, jQuery based etc.)', value: 'otherWeb' }]
      }]).then(function (answer) {
        conf.type = answer.type;
      });

      conf.baseUrl = yield _this.promptFolders('What is base url?', 'http://localhost:3000');
      yield _inquirer2.default.prompt([{
        type: 'rawlist',
        name: 'type',
        message: 'What kind of email service would you like to use?',
        choices: [{ name: 'None', value: 'none' }, { name: 'Custom (you will have to fill configuration on your own)', value: 'custom' }, { name: 'MailTrap', value: 'mailtrap' }]
      }]).then(function (answer) {
        if (answer.type !== 'none') {
          conf.email = {
            type: answer.type
          };
        }
      });

      if (conf.email && conf.email.type === 'mailtrap') {
        conf.email = _extends({}, conf.email, {
          config: {
            url: 'https://mailtrap.io/api/v1',
            apiKey: '',
            inboxId: ''
          }
        });

        conf.email.config.apiKey = yield _this.promptFolders('Type in your mailtrap apikey:', conf.email.config.apiKey);
        conf.email.config.inboxId = yield _this.promptFolders('Type in your mailtrap inboxId:', conf.email.config.inboxId);
      }

      if (advancedConfiguration) {
        yield _this.initEnv();
        conf.browserWidth = parseInt((yield _this.promptFolders('What is desired browser width?', conf.browserWidth)));
        conf.browserHeight = parseInt((yield _this.promptFolders('What is desired browser height?', conf.browserHeight)));

        conf.timeout = parseInt((yield _this.promptFolders('What is desired step timeout in seconds?', conf.timeout)));
        conf.intervalEmail = parseInt((yield _this.promptFolders('What is desired step email interval in seconds?', conf.intervalEmail)));
        conf.maxEmailRepeats = parseInt((yield _this.promptFolders('How many times emails should be checked - maximum repeats?', conf.maxEmailRepeats)));
        conf.elementsVisibilityTimeout = parseInt((yield _this.promptFolders('What is desired elements visibility timeout in seconds?', conf.elementsVisibilityTimeout)));
        conf.waitForPageTimeout = parseInt((yield _this.promptFolders('How long should I wait for page to load in seconds?', conf.waitForPageTimeout)));
        conf.downloadTimeout = parseInt((yield _this.promptFolders('How long should I wait for files to download in seconds?', conf.downloadTimeout)));

        conf.reports = yield _this.promptFolders('Where are your reports stored?', conf.reports);
        conf.downloads = yield _this.promptFolders('Where are your downloads stored?', conf.downloads);
        conf.data = yield _this.promptFolders('Where is your data stored?', conf.data);

        conf.features = [yield _this.promptFolders('Where are your features stored?', conf.features[0])];
        conf.pages = [yield _this.promptFolders('Where are your pages stored?', conf.pages[0])];
        conf.matchers = [yield _this.promptFolders('Where are your matchers stored?', conf.matchers[0])];
        conf.generators = [yield _this.promptFolders('Where are your generators stored?', conf.generators[0])];
        conf.form_handlers = [yield _this.promptFolders('Where are your form handlers stored?', conf.form_handlers[0])];
        conf.step_definitions = [yield _this.promptFolders('Where are your step definitions stored?', conf.step_definitions[0])];
        conf.comparators = [yield _this.promptFolders('Where are your comparators stored?', conf.comparators[0])];
        conf.dictionaries = [yield _this.promptFolders('Where are your dictionaries stored?', conf.dictionaries[0])];
        conf.regexes = [yield _this.promptFolders('Where are your regexes stored?', conf.regexes[0])];
        conf.hooks = [yield _this.promptFolders('Where are your hooks stored?', conf.hooks[0])];
        conf.transformers = [yield _this.promptFolders('Where are your transformers stored?', conf.transformers[0])];

        conf.clearEmailInboxBeforeTests = yield _this.promptFolders('Should email inbox be cleared before tests?', conf.clearEmailInboxBeforeTests, 'confirm');
        conf.clearCookiesAfterScenario = yield _this.promptFolders('Should cookies be cleared after scenario?', conf.clearCookiesAfterScenario, 'confirm');
        conf.clearLocalStorageAfterScenario = yield _this.promptFolders('Should local storage be cleared after scenario?', conf.clearLocalStorageAfterScenario, 'confirm');
        conf.browserMob = {
          serverPort: parseInt((yield _this.promptFolders('Define port where browsermob-proxy is running!', 8887))),
          port: parseInt((yield _this.promptFolders('Define port where browsermob-proxy should be listening!', 8888))),
          host: yield _this.promptFolders('Define host where browsermob-proxy is running!', 'localhost')
        };
      }

      conf.accounts = {
        someAccount: {
          accounts: [{
            email: '',
            password: ''
          }]
        }
      };

      _this.createTemplateFile('/kakunin.conf.js', 'module.exports = ' + JSON.stringify(conf, null, 4));
    })();
  }

  initEnv() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const envs = [];

      envs.push('FIXTURES_RELOAD_HOST=' + (yield _this2.promptFolders('Define FIXTURES_RELOAD_HOST', '')));

      _this2.createTemplateFile('/.env', envs.join('\n'));
    })();
  }

  generateProjectStructure() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const config = require(process.cwd() + '/kakunin.conf.js');

      _this3.createProjectDirectory(config.reports);
      _this3.createProjectDirectory(_path2.default.join(config.reports, 'report'));
      _this3.createProjectDirectory(_path2.default.join(config.reports, 'report', 'features'));
      _this3.createProjectDirectory(_path2.default.join(config.reports, 'performance'));
      _this3.createProjectDirectory(config.downloads);
      _this3.createProjectDirectory(config.data);

      _this3.createProjectDirectory(config.features[0]);
      _this3.createProjectDirectory(config.pages[0]);
      _this3.createProjectDirectory(config.matchers[0]);
      _this3.createProjectDirectory(config.generators[0]);
      _this3.createProjectDirectory(config.form_handlers[0]);
      _this3.createProjectDirectory(config.step_definitions[0]);
      _this3.createProjectDirectory(config.comparators[0]);
      _this3.createProjectDirectory(config.dictionaries[0]);
      _this3.createProjectDirectory(config.regexes[0]);
      _this3.createProjectDirectory(config.hooks[0]);
      _this3.createProjectDirectory(config.transformers[0]);
      _this3.createProjectDirectory(config.emails[0]);

      _this3.createTemplateFile(_path2.default.join(config.downloads, '.gitkeep'), '');
      _this3.createTemplateFile(_path2.default.join(config.reports, 'report', '.gitkeep'), '');
      _this3.createTemplateFile(_path2.default.join(config.reports, 'report', 'features', '.gitkeep'), '');
      _this3.createTemplateFile(_path2.default.join(config.reports, 'performance', '.gitkeep'), '');
      _this3.createTemplateFileWithContentFrom(config.features[0] + '/example.feature', 'example.feature');
      _this3.createTemplateFileWithContentFrom(config.pages[0] + '/page.js', 'page.js');
      _this3.createTemplateFileWithContentFrom(config.matchers[0] + '/matcher.js', 'matcher.js');
      _this3.createTemplateFileWithContentFrom(config.generators[0] + '/generator.js', 'generator.js');
      _this3.createTemplateFileWithContentFrom(config.step_definitions[0] + '/steps.js', 'steps.js');
      _this3.createTemplateFileWithContentFrom(config.regexes[0] + '/regex.js', 'regex.js');
      _this3.createTemplateFileWithContentFrom(config.hooks[0] + '/hook.js', 'hook.js');
    })();
  }
}

exports.default = new Initializer();