'use strict';

const { BasePage } = require('kakunin');

class ButtonForm extends BasePage {
  constructor() {
    super();

    this.url = '/form/disappear';

    this.disappearBtn = $('#button');
  }
}

module.exports = ButtonForm;
