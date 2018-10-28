'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('./config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accounts = _config2.default.accounts;

const userProvider = {
  getUser: function (userType) {
    const user = accounts[userType];

    if (user.accounts.length > 1) {
      const usedAccounts = user.accounts.filter(account => account.used);

      if (usedAccounts.length === user.accounts.length) {
        user.accounts.map(account => _extends({}, account, {
          used: false
        }));
      }

      return user.accounts.find(account => !account.used);
    }

    return user.accounts[0];
  },

  lockUser: function (user, userType) {
    if (accounts[userType].accounts.length > 1) {
      accounts[userType].accounts.forEach((account, index) => {
        if (account.email === user.email) {
          accounts[userType].accounts[index].used = true;
        }
      });
    }
  }
};

exports.default = userProvider;