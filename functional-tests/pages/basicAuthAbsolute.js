const { BasePage } = require('kakunin');

class BasicAuthAbsolutePage extends BasePage {
  constructor() {
    super();

    this.url = 'http://localhost:8080/basic-auth';
    
    this.title = $('p');
  }
}

module.exports = BasicAuthAbsolutePage;
