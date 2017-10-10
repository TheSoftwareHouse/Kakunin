'use strict';

const { BasePage } = require('kakunin');

class NavigationPagesPage extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/pages/:pageId/titles/:title';

    this.pageId = $('p.pageId');
    this.title = $('p.title');
  }
}

module.exports = NavigationPagesPage;
