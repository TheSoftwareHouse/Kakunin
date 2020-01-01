const { BasePage } = require('kakunin');

class BasicAuthPage extends BasePage {
  constructor() {
    super();

    this.url = '/basic-auth';
    
    this.title = $('p');
  }
}

module.exports = BasicAuthPage;
