'use strict';

const { BasePage } = require('kakunin');

class TabularData extends BasePage {
  constructor() {
    super();

    this.url = '/tabular-data';

    this.rows = $$('table tr');
    this.indexLocator = $('.index');
    this.descendingIndex = $('.descending-sort');
    this.idLocator = $('.id');
    this.nameLocator = $('.name');
    this.viewButton = $('button.view');
  }
}

module.exports = new TabularData();
