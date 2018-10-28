module.exports = {
  "extends": "airbnb/legacy",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-plusplus": 0,
    "no-trailing-spaces": ["error", {
      "skipBlankLines": true
    }],
    "max-len": [2, 120, 4, {"ignoreUrls": true}],
    "class-methods-use-this": ["error", {"exceptMethods": ["isSatisfiedBy", "handleFill", "handleCheck", "match", "buildRegex", "getPriority", "filter"]}],
    "space-before-function-paren": "off",
    "func-names": "off",
    "no-console": "off",
    "prefer-promise-reject-errors": "off",
    "object-curly-newline": ["error", {
      "ImportDeclaration": "never",
    }],
    "no-unused-expressions": "off",
    "consistent-return": "off",
    "guard-for-in": "off",
    "no-restricted-syntax" : "off",
    "radix": "off",
    "no-prototype-builtins": "off",
    "comma-dangle": "off",
    "no-await-in-loop": "off",
    "no-buffer-constructor": "off",
    "no-throw-literal": "off",
    "no-nested-ternary": "off",
    "operator-linebreak": "off"
  },
  "globals": {
    "Promise": true,
    "expect": true
  },
  "env": {
    "browser": true,
    "node": true,
    "protractor": true,
    "mocha": true
  }
};
