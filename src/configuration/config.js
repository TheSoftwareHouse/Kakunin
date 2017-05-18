const pascalConfig = require('../helpers/pascalConfig');
const { defineSupportCode } = require('cucumber');

defineSupportCode(function({setDefaultTimeout}) {
  setDefaultTimeout(Number(pascalConfig.timeout) * 1000);
});
