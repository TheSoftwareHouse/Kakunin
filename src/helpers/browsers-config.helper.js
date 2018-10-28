import glob from 'glob';
import _ from 'lodash';
import path from 'path';
const { createFirefoxProfile } = require('./create-firefox-profile.helper');
const { safariBrowserConfigurator } = require('./safari-browser-configurator.helper');
const { prepareBrowserInstance } = require('./prepare-browser-instance-specs.helper');

const getDefaultBrowsersConfigs = config => {
  const chromeConfig = {
    browserName: 'chrome',
    chromeOptions: {
      args: [],
      prefs: {
        credentials_enable_service: false,
        profile: {
          password_manager_enabled: false,
        },
        download: {
          prompt_for_download: false,
          default_directory: config.projectPath + config.downloads,
          directory_upgrade: true,
        },
      },
    },
  };

  const firefoxConfig = {
    browserName: 'firefox',
    marionette: true,
    'moz:firefoxOptions': {
      args: [],
    },
  };

  const safariConfig = {
    browserName: 'safari',
  };

  return {
    chromeConfig,
    firefoxConfig,
    safariConfig,
  };
};

const getExtendedBrowsersConfigs = config => {
  const configs = getDefaultBrowsersConfigs(config);

  if (config.performance) {
    configs.chromeConfig.proxy = {
      proxyType: 'manual',
      httpProxy: `${config.browserMob.host}:${config.browserMob.port}`,
      sslProxy: `${config.browserMob.host}:${config.browserMob.port}`,
    };
  }

  if (config.noGpu) {
    configs.chromeConfig.chromeOptions.args = [
      ...configs.chromeConfig.chromeOptions.args,
      '--disable-gpu',
      '--disable-impl-side-painting',
      '--disable-gpu-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-accelerated-jpeg-decoding',
      '--no-sandbox',
    ];
  }

  if (config.headless) {
    configs.chromeConfig.chromeOptions.args = [
      ...configs.chromeConfig.chromeOptions.args,
      '--headless',
      `--window-size=${config.browserWidth}x${config.browserHeight}`,
    ];

    configs.firefoxConfig['moz:firefoxOptions'].args = [
      ...configs.firefoxConfig['moz:firefoxOptions'].args,
      '-headless',
      `--window-size=${config.browserWidth}x${config.browserHeight}`,
    ];
  }

  return configs;
};

const browsersConfiguration = (config, commandArgs) => {
  return async () => {
    const browsersSettings = [];
    const browserConfigs = getExtendedBrowsersConfigs(config, commandArgs);
    const allSpecs = glob.sync(config.features.map(file => path.join(config.projectPath, file, '**/*.feature'))[0]);
    const isPararell =
      commandArgs.parallel !== undefined && Number.isInteger(commandArgs.parallel) && commandArgs.parallel !== 0;

    const numberOfInstances = isPararell
      ? commandArgs.parallel >= allSpecs.length
        ? allSpecs.length
        : commandArgs.parallel
      : 1;
    const expectedArrayLength = Math.ceil(allSpecs.length / numberOfInstances);
    const chunkedSpecs = _.chunk(allSpecs, expectedArrayLength);

    if (allSpecs.length === 0) {
      throw new Error('Could not find any files matching regex in the directory!');
    }

    const pushPreparedBrowserInstance = browserType => {
      for (let i = 0; i < numberOfInstances; i++) {
        browsersSettings.push(prepareBrowserInstance(browserConfigs[browserType], chunkedSpecs[i]));
      }
    };

    if (commandArgs.firefox) {
      browserConfigs.firefoxConfig.firefox_profile = await createFirefoxProfile(config);
      pushPreparedBrowserInstance('firefoxConfig');
    }

    if (commandArgs.safari) {
      safariBrowserConfigurator(config);
      pushPreparedBrowserInstance('safariConfig');
    }

    if (commandArgs.chrome || (commandArgs.firefox === undefined && commandArgs.safari === undefined)) {
      pushPreparedBrowserInstance('chromeConfig');
    }

    return Promise.resolve(browsersSettings);
  };
};

module.exports = browsersConfiguration;
