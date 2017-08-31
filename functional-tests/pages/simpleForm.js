'use strict';

const { FormPage } = require('kakunin');

class SimpleForm extends FormPage {
  constructor() {
    super();

    this.url = '/form/simple';

    this.form = $('form');
    this.nameInput = this.form.$('input[name="name"]');
    this.descriptionTextarea = this.form.$('textarea[name="description"]');
    this.optionCheckboxes = this.form.$$('input[type="checkbox"]');
    this.optionRadios = this.form.$$('input[type="radio"]');
    this.statusSelect = this.form.$('select[name="status"]');

    this.submitButton = this.form.$('input[type="submit"]');
  }
}

module.exports = new SimpleForm();
