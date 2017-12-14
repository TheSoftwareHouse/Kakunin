'use strict';

const { BasePage } = require('kakunin');

class AppearTabularData extends BasePage {
  constructor() {
    super();

    this.url = '/wait-for-appear/table';

    this.tableAppearBtn = $('.colored');
    this.rows = $$('table tr');
    this.indexLocator = $('.index');
    this.descendingIndex = $('.descending-sort');
    this.idLocator = $('.id');
    this.nameLocator = $('.name');
    this.viewButton = $('button.view');
  }
}

module.exports = AppearTabularData;
