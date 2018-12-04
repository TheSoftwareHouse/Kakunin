import config from '../core/config.helper';
const accounts = config.accounts;

const userProvider = {
  getUser: function(userType) {
    const user = accounts[userType];

    if (user.accounts.length > 1) {
      const usedAccounts = user.accounts.filter(account => account.used);

      if (usedAccounts.length === user.accounts.length) {
        user.accounts.map(account => ({
          ...account,
          used: false,
        }));
      }

      return user.accounts.find(account => !account.used);
    }

    return user.accounts[0];
  },

  lockUser: function(user, userType) {
    if (accounts[userType].accounts.length > 1) {
      accounts[userType].accounts.forEach((account, index) => {
        if (account.email === user.email) {
          accounts[userType].accounts[index].used = true;
        }
      });
    }
  },
};

export default userProvider;
