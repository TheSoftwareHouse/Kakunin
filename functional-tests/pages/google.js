'use strict';

const { BasePage } = require('kakunin');

class GooglePage extends BasePage {
  constructor() {
    super();

    this.url = 'https://www.google.pl';
  }
}

module.exports = new GooglePage();
