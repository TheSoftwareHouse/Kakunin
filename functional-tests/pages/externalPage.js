'use strict';

const { BasePage } = require('kakunin');

class ExternalPage extends BasePage {
  constructor() {
    super();

    this.url = 'http://localhost:8080/external-page';
  }
}

module.exports = new ExternalPage();
