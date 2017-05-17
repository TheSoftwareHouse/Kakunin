const pascalConfig = require('../helpers/pascalConfig');

const configure = function () {
  this.setDefaultTimeout(parseInt(pascalConfig.timeout) * 1000);
};

module.exports = configure;
