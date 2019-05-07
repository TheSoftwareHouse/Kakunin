import fetch from 'node-fetch';

const FixturesLoader = {
  reloadFixtures(endpoint) {
    return fetch(endpoint);
  },
};

export default FixturesLoader;
