const { createFirefoxProfile } = require('./create-firefox-profile.helper');

const getDefaultBrowsersConfigs = (config) => {
  const chromeConfig = {
    browserName: 'chrome',
    chromeOptions: {
      args: [],
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
  };

  const firefoxConfig = {
    browserName: 'firefox',
    marionette: true,
    'moz:firefoxOptions': {
      args: []
    }
  };

  return {
    chromeConfig,
    firefoxConfig
  };
};

const getExtendedBrowsersConfigs = (config) => {
  const configs = getDefaultBrowsersConfigs(config);

  if (config.performance) {
    configs.chromeConfig.proxy = {
      proxyType: 'manual',
      httpProxy: `${config.browserMob.host}:${config.browserMob.port}`,
      sslProxy: `${config.browserMob.host}:${config.browserMob.port}`
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
      '--no-sandbox'
    ];
  }

  if (config.headless) {
    configs.chromeConfig.chromeOptions.args = [
      ...configs.chromeConfig.chromeOptions.args,
      '--headless',
      `--window-size=${config.browserWidth}x${config.browserHeight}`
    ];

    configs.firefoxConfig['moz:firefoxOptions'].args = [
      ...configs.firefoxConfig['moz:firefoxOptions'].args,
      '-headless',
      `--window-size=${config.browserWidth}x${config.browserHeight}`
    ];
  }

  return configs;
};

const browsersConfiguration = (config, commandArgs) => {
  return async () => {
    const browsersSettings = [];
    const configs = getExtendedBrowsersConfigs(config);

    if (commandArgs.firefox) {
      configs.firefoxConfig.firefox_profile = await createFirefoxProfile();
      browsersSettings.push(configs.firefoxConfig);
    }

    if (commandArgs.chrome || browsersSettings.length === 0) {
      browsersSettings.push(configs.chromeConfig);
    }

    return Promise.resolve(browsersSettings);
  };
};

module.exports = browsersConfiguration;
