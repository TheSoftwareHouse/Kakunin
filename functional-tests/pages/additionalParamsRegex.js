'use strict';

const { BasePage } = require('kakunin');

class AdditionalParamsRegexPage extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/pages/:id/titles/myPageTitle?additionalParam1=value1&additionalParam2=value2';
  }
}

module.exports = AdditionalParamsRegexPage;
