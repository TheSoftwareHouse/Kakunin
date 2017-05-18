require('./src/helpers/prototypes');
const path = require('path');
const chai = require('chai');
const modulesLoader = require('./src/helpers/modulesLoader').create();
const chaiAsPromised = require('chai-as-promised');
const mailTrapClient = require('./src/emails/mailtrapClient');
chai.use(chaiAsPromised);

const pascalConfig = require('./src/helpers/pascalConfig');

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
            default_directory: pascalConfig.projectPath + pascalConfig.downloads,
            directory_upgrade: true
          }
        }
      }
    }
  ],

  useAllAngular2AppRoots: pascalConfig.type === 'ng2',

  getPageTimeout: parseInt(pascalConfig.timeout) * 1000,
  allScriptsTimeout: parseInt(pascalConfig.timeout) * 1000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: pascalConfig.features.map(file => pascalConfig.projectPath + file + '/**/*.feature'),

  cucumberOpts: {
    require: [
      './src/configuration/config.js',
      './src/configuration/hooks.js',
      './src/step_definitions/**/*.js',
      ...pascalConfig.step_definitions.map(file => pascalConfig.projectPath + file + '/**/*.js'),
      ...pascalConfig.hooks.map(file => pascalConfig.projectPath + file + '/**/*.js')
    ],
    format: ['pretty', 'json:../../reports/features-report.json'],
    profile: false,
    'no-source': true
  },

  onPrepare: function () {
    browser.driver.manage().window().setSize(
      parseInt(pascalConfig.browserWidth),
      parseInt(pascalConfig.browserHeight)
    );

    browser.page = modulesLoader
      .getModulesAsObject(
        pascalConfig.pages.map((page) => path.join(pascalConfig.projectPath, page))
      );

    global.expect = chai.expect;

    if (pascalConfig.clearEmailInboxBeforeTests) {
      return mailTrapClient.clearInbox();
    }
  },

  baseUrl: pascalConfig.baseUrl
};
