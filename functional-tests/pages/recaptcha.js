'use strict';

const { BasePage } = require('kakunin');

class RecaptchaPage extends BasePage {
  constructor() {
    super();

    this.url = '/recaptcha';

    this.form = $('#comment_form');
    this.emailElement = $('input[type=email]');
    this.postCommentButton = $('input[name=submit]');
    this.iframeElement = $('.g-recaptcha iframe');
    this.recaptchaNotConfirmed = $('pre');
  }
}

module.exports = RecaptchaPage;
