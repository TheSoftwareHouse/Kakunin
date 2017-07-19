require('./helpers/prototypes');
const path = require('path');
const chai = require('chai');
const modulesLoader = require('./helpers/modules-loader.helper.js').create();
const chaiAsPromised = require('chai-as-promised');
const emailService = require('./emails/email.service').create();
chai.use(chaiAsPromised);

const config = require('./helpers/config.helper.js').default;

exports.config = {
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        prefs: {
          credentials_enable_service: false,
          profile: {
            password_manager_enabled: false
          },
          download: {
            prompt_for_download: false,
            default_directory: config.projectPath + config.downloads,
            directory_upgrade: true
          }
        }
      }
    }
  ],

  useAllAngular2AppRoots: config.type === 'ng2',

  getPageTimeout: parseInt(config.timeout) * 1000,
  allScriptsTimeout: parseInt(config.timeout) * 1000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: config.features.map(file => config.projectPath + file + '/**/*.feature'),

  cucumberOpts: {
    require: [
      './configuration/config.js',
      './configuration/hooks.js',
      './step_definitions/**/*.js',
      ...config.step_definitions.map(file => config.projectPath + file + '/**/*.js'),
      ...config.hooks.map(file => config.projectPath + file + '/**/*.js')
    ],
    format: ['pretty', `json:../..${config.reports}/features-report.json`],
    profile: false,
    'no-source': true
  },

  onPrepare: function () {
    browser.driver.manage().window().setSize(
      parseInt(config.browserWidth),
      parseInt(config.browserHeight)
    );

    modulesLoader.getModules('matchers');
    modulesLoader.getModules('dictionaries');
    modulesLoader.getModules('generators');
    modulesLoader.getModules('comparators');
    modulesLoader.getModules('form_handlers');
    modulesLoader.getModules('transformers');

    browser.page = modulesLoader
      .getModulesAsObject(
        config.pages.map((page) => path.join(config.projectPath, page))
      );

    global.expect = chai.expect;

    if (config.clearEmailInboxBeforeTests) {
      return emailService.clearInbox();
    }
  },

  baseUrl: config.baseUrl
};
