'use strict';

const { generators } = require('kakunin');

class Generator {
  isSatisfiedBy(name) {
    return name === 'name';
  }

  generate() {
    const names = ['Bob', 'John', 'Paul'];

    return names[Math.floor(Math.random() * names.length)];
  }
}

generators.addGenerator(new Generator());