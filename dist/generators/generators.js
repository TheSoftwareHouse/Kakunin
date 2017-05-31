'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _generator = require('./generator');

var generator = _interopRequireWildcard(_generator);

var _modulesLoader = require('../helpers/modules-loader.helper');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const modulesLoader = (0, _modulesLoader.create)();

class Generators {
  constructor(loader) {
    this.availableGenerators = [generator.stringWithLengthGenerator, ...loader.getModules('generators')];
  }

  generate(generatorName, ...params) {
    const gen = this.findGenerator(generatorName);

    if (gen === undefined) {
      throw new Error(`Could not find generator for ${generatorName}.`);
    }

    return gen.generate(...params);
  }

  findGenerator(name) {
    return this.availableGenerators.find(gen => gen.isSatisfiedBy(name));
  }
}

const create = exports.create = (loader = modulesLoader) => new Generators(loader);