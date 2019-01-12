'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGeneratorTransformer = undefined;

var _generators = require('../../generators');

class GeneratorTransformer {
  constructor(generator) {
    this.generator = generator;
  }

  isSatisfiedBy(prefix) {
    return prefix === 'g:';
  }

  transform(value) {
    const splittedValues = value.split(':');
    const generatorName = splittedValues[0];

    return this.generator.generate(generatorName, splittedValues.slice(1));
  }
}
const createGeneratorTransformer = exports.createGeneratorTransformer = (geners = _generators.generators) => new GeneratorTransformer(geners);