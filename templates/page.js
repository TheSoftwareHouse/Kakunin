const base = require('pascal/pages').base;

class ExamplePage extends base {
  constructor() {
    super();

    this.url = '/';
  }
}

module.exports = new ExamplePage();
