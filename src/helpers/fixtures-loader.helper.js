import fetch from 'node-fetch';

const FixturesLoader = {
  reloadFixtures: function (endpoint) {
    return fetch(endpoint);
  }
};

export default FixturesLoader;
