'use strict';

const { BasePage } = require('kakunin');

class AbsolutePage extends BasePage {
  constructor() {
    super();

    this.url = 'http://localhost:8080/absolute-page';
  }
}

module.exports = new AbsolutePage();
