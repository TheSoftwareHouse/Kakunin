require('./helpers/prototypes');
const path = require('path');
const chai = require('chai');
const config = require('./helpers/config.helper').default;
const modulesLoader = require('./helpers/modules-loader.helper.js').create();
const { deleteReports } = require('./helpers/delete-files.helper');
const { prepareCatalogs } = require('./helpers/prepare-catalogs.helper');
const browsersConfiguration = require('./helpers/browsers-config.helper');
const chaiAsPromised = require('chai-as-promised');
const { emailService } = require('./emails');
const commandArgs = require('minimist')(process.argv.slice(2));
chai.use(chaiAsPromised);

const reportsDirectory = path.join(config.projectPath, config.reports);
const jsonOutputDirectory = path.join(reportsDirectory, 'json-output-folder');
const generatedReportsDirectory = path.join(reportsDirectory, 'report');
const featureReportsDirectory = path.join(generatedReportsDirectory, 'features');
const performanceReportsDirectory = path.join(reportsDirectory, 'performance');

const prepareReportCatalogs = () => {
  prepareCatalogs(reportsDirectory);
  prepareCatalogs(generatedReportsDirectory);
  prepareCatalogs(featureReportsDirectory);
  prepareCatalogs(performanceReportsDirectory);
};

const deleteReportFiles = () => {
  deleteReports(reportsDirectory);
  deleteReports(jsonOutputDirectory);
  deleteReports(generatedReportsDirectory);
  deleteReports(featureReportsDirectory);
  deleteReports(performanceReportsDirectory);

  console.log('All reports have been deleted!');
};

exports.config = {
  getMultiCapabilities: browsersConfiguration(config, commandArgs),

  useAllAngular2AppRoots: config.type === 'ng2',

  getPageTimeout: parseInt(config.timeout) * 1000,
  allScriptsTimeout: parseInt(config.timeout) * 1000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [],

  cucumberOpts: {
    require: [
      './configuration/config.js',
      './configuration/hooks.js',
      './step_definitions/**/*.js',
      ...config.step_definitions.map(file => path.join(config.projectPath, file, '**/*.js')),
      ...config.hooks.map(file => path.join(config.projectPath, file, '**/*.js'))
    ],
    format: [`json:./${config.reports}/features-report.json`],
    profile: false,
    'no-source': true
  },

  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile: true,
      automaticallyGenerateReport: true,
      saveCollectedJSON: true
    }
  }],

  beforeLaunch: async function () {
    await prepareReportCatalogs();
    await deleteReportFiles();
  },

  onPrepare: function () {
    if (!config.headless) {
      browser.driver.manage().window().setSize(
        parseInt(config.browserWidth),
        parseInt(config.browserHeight)
      );
    }

    modulesLoader.getModules('matchers');
    modulesLoader.getModules('dictionaries');
    modulesLoader.getModules('generators');
    modulesLoader.getModules('comparators');
    modulesLoader.getModules('form_handlers');
    modulesLoader.getModules('transformers');
    modulesLoader.getModules('emails');

    const modules = modulesLoader
      .getModulesAsObject(
        config.pages.map((page) => path.join(config.projectPath, page))
      );

    browser.page = Object.keys(modules)
      .reduce((pages, moduleName) => ({ ...pages, [moduleName]: new modules[moduleName]() }), {});

    global.expect = chai.expect;

    if (config.clearEmailInboxBeforeTests) {
      return emailService.clearInbox();
    }
  },

  baseUrl: config.baseUrl
};
