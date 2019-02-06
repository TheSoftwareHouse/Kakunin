'use strict';

const { BasePage } = require('kakunin');

class MatchersPage extends BasePage {
  constructor() {
    super();

    this.url = '/matchers';

    this.dateMatcherText = $('p.date-matcher ');
    this.dateElement = $('span.current_date ');
  }
}

module.exports = MatchersPage;
