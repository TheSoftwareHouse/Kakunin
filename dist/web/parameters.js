'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Parameters = {
  getReloadFixturesEndpoint: function () {
    const config = this.getConfig();

    return config.fixturesReloadHost;
  },

  getConfig() {
    if (typeof process.env.FIXTURES_RELOAD_HOST === 'undefined') {
      throw new Error('Missing fixtures reload url. Use export FIXTURES_RELOAD_HOST=valid-host for setup.');
    }

    return {
      fixturesReloadHost: process.env.FIXTURES_RELOAD_HOST
    };
  }
};

exports.default = Parameters;