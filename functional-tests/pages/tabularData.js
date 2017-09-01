'use strict';

const { BasePage } = require('kakunin');

class TabularData extends BasePage {
  constructor() {
    super();

    this.url = '/tabular-data';

    this.rows = $$('table tr');
    this.indexLocator = by.css('.index');
    this.idLocator = by.css('.id');
    this.nameLocator = by.css('.name');
    this.viewButton = by.css('button.view');
  }
}

module.exports = new TabularData();
