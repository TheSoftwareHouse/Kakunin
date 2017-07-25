'use strict';

const { BasePage } = require('kakunin');

class MainPage extends BasePage {
  constructor() {
    super();

    this.url = '/index.html';

    this.formLink = $('a[href="form/form.html"]');
  }
}

module.exports = new MainPage();
