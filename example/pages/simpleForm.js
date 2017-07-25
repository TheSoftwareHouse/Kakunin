'use strict';

const { FormPage } = require('kakunin');

class SimpleForm extends FormPage {
  constructor() {
    super();

    this.url = '/form/form.html';

    this.form = $('form');
  }
}

module.exports = new SimpleForm();
