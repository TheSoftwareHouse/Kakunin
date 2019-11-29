'use strict';

const { BasePage } = require('kakunin');

class AbsolutePage extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/iframe';

    this.externalDiv = $('#externaldivid');
    this.internaldiv = $('#internaldivid');
    this.iframeElement = $('#iframeid');
  }
}

module.exports = AbsolutePage;
