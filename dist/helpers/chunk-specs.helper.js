'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunkSpecs = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const chunkSpecs = exports.chunkSpecs = (commandArgs, allSpecs, expectedArrayLength, numberOfInstances) => {
  if (commandArgs.pattern !== undefined && typeof commandArgs.pattern !== 'boolean') {
    const patterns = commandArgs.pattern.split(',');
    const chunkedSpecs = [];

    if (patterns.length !== numberOfInstances) {
      throw new Error('Number of the specified patterns is different than number of instances!');
    }

    for (const pattern of patterns) {
      chunkedSpecs.push(allSpecs.filter(spec => spec.match(new RegExp(pattern))));
    }

    return chunkedSpecs;
  }

  return _lodash2.default.chunk(allSpecs, expectedArrayLength);
};