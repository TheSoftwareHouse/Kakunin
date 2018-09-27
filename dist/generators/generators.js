'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _generator = require('./generator');

var generator = _interopRequireWildcard(_generator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Generators {
  constructor() {
    this.availableGenerators = [generator.personalDataGenerator, generator.stringWithLengthGenerator];
  }

  generate(generatorName, ...params) {
    const gen = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate(...params);
  }

  addGenerator(generator) {
    this.availableGenerators.push(generator);
  }

  findGenerator(name) {
    return this.availableGenerators.find(gen => gen.isSatisfiedBy(name));
  }
}

const create = exports.create = () => new Generators();