'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.personalDataGenerator = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const personalDataGenerator = exports.personalDataGenerator = {
  isSatisfiedBy: function (name) {
    return name === 'personalData';
  },

  generate: function (options) {
    switch (options[0]) {
      case 'firstName':
        return Promise.resolve(_faker2.default.name.firstName());
      case 'lastName':
        return Promise.resolve(_faker2.default.name.lastName());
      case 'jobTitle':
        return Promise.resolve(_faker2.default.name.jobTitle());
      case 'email':
        return Promise.resolve(_faker2.default.internet.email(null, null, options[1]));
      default:
        return Promise.reject('Option not available in "personalData" generator!');
    }
  }
};