'use strict';

const { BasePage } = require('kakunin');

class SimpleForm extends BasePage {
  constructor() {
    super();

    this.url = '/form/select';

    this.form = $('form');
    this.selectPerson = $('#personlist');
    this.personOption = this.selectPerson.$$('option');
    this.submitButton = this.form.$('input[type="submit"]');
  }
}

module.exports = SimpleForm;
