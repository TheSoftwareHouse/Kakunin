'use strict';

const { FormPage } = require('kakunin');

class SimpleFormPost extends FormPage {
  constructor() {
    super();

    this.url = '/form/simple/post';

    this.form = $('form');
    this.nameInput = this.form.$('input[name="name"]');
    this.descriptionTextarea = this.form.$('textarea[name="description"]');
    this.optionCheckboxes = this.form.$$('input[type="checkbox"]');
    this.optionRadios = this.form.$$('input[type="radio"]');
    this.statusSelect = this.form.$('select[name="status"]');
  }
}

module.exports = new SimpleFormPost();
