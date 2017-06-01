'use strict';

class Generator {
  isSatisfiedBy(name) {
    return name === 'name';
  }

  generate() {
    const names = ['Bob', 'John', 'Paul'];

    return names[Math.floor(Math.random() * names.length)];
  }
}

module.exports = new Generator();