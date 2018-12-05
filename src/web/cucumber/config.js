import config from '../../core/config.helper';
const { defineSupportCode } = require('cucumber');

defineSupportCode(function({ setDefaultTimeout }) {
  setDefaultTimeout(Number(config.timeout) * 1000);
});
