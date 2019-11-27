'use strict';

const { BasePage } = require('kakunin');

class AbsolutePage extends BasePage {
  constructor() {
    super();

    this.url = '/navigation/iframe';

    this.externalDiv = $('#externaldivid');
    this.internaldiv = $('#internaldivid');
    this.iframeElemenet = $('#iframeid');
  }
}

module.exports = AbsolutePage;
