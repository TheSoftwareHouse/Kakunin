module.exports = {
  "extends": "airbnb/legacy",
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules": {
    "no-plusplus": 0,
    "no-trailing-spaces": ["error", {
      "skipBlankLines": true
    }]
  },
  "globals": {
    "Promise": true
  },
  "env": {
    "browser": true,
    "node": true,
    "protractor": true,
    "mocha": true
  }
};
