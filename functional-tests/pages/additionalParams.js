'use strict';

const { BasePage } = require('kakunin');

class AdditionalParamsPage extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/pages/:id/titles/:title?additionalParam1=:value1&additionalParam2=:value2';
  }
}

module.exports = AdditionalParamsPage;
