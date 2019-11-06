'use strict';

const { BasePage } = require('kakunin');

class AdditionalParamsRegex2Page extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/pages/:id/titles/:wild-card?additionalParam1=value1&additionalParam2=value2';
  }
}

module.exports = AdditionalParamsRegex2Page;
