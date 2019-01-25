'use strict';

const { BasePage } = require('kakunin');

class AdditonalParamsPage extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/pages/myPageId/titles/myPageTitle?additionalParam1=value1&additionalParam2=value2';
  }
}

module.exports = AdditonalParamsPage;
