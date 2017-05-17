const fetch = require('node-fetch');

const FixturesLoader = {
  reloadFixtures: function (endpoint) {
    return fetch(endpoint);
  }
};

module.exports = FixturesLoader;
