'use strict';

const { BasePage } = require('kakunin');

class ExamplePage extends BasePage {
  constructor() {
    super();

    this.url = '/';
  }
}

module.exports = ExamplePage;