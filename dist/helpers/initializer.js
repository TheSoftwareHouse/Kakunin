'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
        elementsVisibilityTimeout: 5,
        waitForPageTimeout: 5,
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
        clearLocalStorageAfterScenario: true
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

      if (advancedConfiguration) {
        conf.browserWidth = yield _this.promptFolders('What is desired browser width?', conf.browserWidth);
        conf.browserHeight = yield _this.promptFolders('What is desired browser height?', conf.browserHeight);

        conf.timeout = yield _this.promptFolders('What is desired step timeout in seconds?', conf.timeout);
        conf.elementsVisibilityTimeout = yield _this.promptFolders('What is desired elements visibility timeout in seconds?', conf.elementsVisibilityTimeout);
        conf.waitForPageTimeout = yield _this.promptFolders('How long should I wait for page to load in seconds?', conf.waitForPageTimeout);

        conf.reports = yield _this.promptFolders('Where are your reports stored?', conf.reports);
        conf.downloads = yield _this.promptFolders('Where are your downloads stored?', conf.downloads);
        conf.data = yield _this.promptFolders('Where is your data stored?', conf.data);

        conf.features = [yield _this.promptFolders('Where are your features stored?', conf.features)];
        conf.pages = [yield _this.promptFolders('Where are your pages stored?', conf.pages)];
        conf.matchers = [yield _this.promptFolders('Where are your matchers stored?', conf.matchers)];
        conf.generators = [yield _this.promptFolders('Where are your generators stored?', conf.generators)];
        conf.form_handlers = [yield _this.promptFolders('Where are your form handlers stored?', conf.form_handlers)];
        conf.step_definitions = [yield _this.promptFolders('Where are your step definitions stored?', conf.step_definitions)];
        conf.comparators = [yield _this.promptFolders('Where are your comparators stored?', conf.comparators)];
        conf.dictionaries = [yield _this.promptFolders('Where are your dictionaries stored?', conf.dictionaries)];
        conf.regexes = [yield _this.promptFolders('Where are your regexes stored?', conf.regexes)];
        conf.hooks = [yield _this.promptFolders('Where are your hooks stored?', conf.hooks)];
        conf.transformers = [yield _this.promptFolders('Where are your transformers stored?', conf.transformers)];

        conf.clearEmailInboxBeforeTests = yield _this.promptFolders('Should email inbox be cleared before tests?', conf.clearEmailInboxBeforeTests, 'confirm');
        conf.clearCookiesAfterScenario = yield _this.promptFolders('Should cookies be cleared after scenario?', conf.clearCookiesAfterScenario, 'confirm');
        conf.clearLocalStorageAfterScenario = yield _this.promptFolders('Should local storage be cleared after scenario?', conf.clearLocalStorageAfterScenario, 'confirm');
      }

      conf.accounts = {
        someAccount: {
          accounts: [{
            email: '',
            password: ''
          }]
        }
      };

      yield _this.initEnv(conf.clearEmailInboxBeforeTests);

      _this.createTemplateFile('/kakunin.conf.js', 'module.exports = ' + JSON.stringify(conf, null, 4));
    })();
  }

  initEnv(configureEmailClient = false) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const envs = [];

      if (configureEmailClient) {
        envs.push('MAILTRAP_URL=' + (yield _this2.promptFolders('Define MAILTRAP_URL', 'https://mailtrap.io/api/v1')));
        envs.push('MAILTRAP_API_KEY=' + (yield _this2.promptFolders('Define MAILTRAP_API_KEY', '')));
        envs.push('MAILTRAP_INBOX_ID=' + (yield _this2.promptFolders('Define MAILTRAP_INBOX_ID', '')));
      }

      envs.push('FIXTURES_RELOAD_HOST=' + (yield _this2.promptFolders('Define FIXTURES_RELOAD_HOST', '')));

      _this2.createTemplateFile('/.env', envs.join('\n'));
    })();
  }

  generateProjectStructure() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const config = require(process.cwd() + '/kakunin.conf.js');

      _this3.createProjectDirectory(config.reports);
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