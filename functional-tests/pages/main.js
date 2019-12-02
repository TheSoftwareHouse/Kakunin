'use strict';

const { BasePage } = require('kakunin');

class MainPage extends BasePage {
  constructor() {
    super();

    this.url = '/';

    this.linkDivs = $$('.available-examples-links');
    this.formLink = $('a[href="/form/simple"]');
    this.formSelectLink = $('a[href="/form/select"]');
    this.absolutePageLink = $('a[href="/absolute-page"]');
    this.googleLink = $('a[href="https://www.google.pl"]');
    this.tabularDataLink = $('a[href="/tabular-data"]');
    this.buttonLink = $('a[href="/form/disappear"]');
    this.valueToClick = $('.valueForClickStep');
    this.appearTable = $('.appearTable');
    this.appearForm = $('.appearForm');
    this.matchersLink = $('.matchers');
    this.matchersInNewTabLink = $('.matchersInNewTab');
    this.iframeLink = $('a[href="/navigation/iframe"]');
    this.recaptchaLink = $('a[href="/recaptcha"]');
  }
}

module.exports = MainPage;
