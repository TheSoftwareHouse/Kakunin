import * as _ from 'lodash';

export const chunkSpecs = (commandArgs, allSpecs, expectedArrayLength, numberOfInstances) => {
  if (commandArgs.pattern !== undefined && typeof commandArgs.pattern !== 'boolean') {
    const patterns = commandArgs.pattern.split(',');
    const chunkedSpecs = [];

    if (patterns.length !== numberOfInstances) {
      throw new Error('Number of the specified patterns is different than number of instances!');
    }

    for (const pattern of patterns) {
      chunkedSpecs.push(allSpecs.filter((spec) => spec.match(new RegExp(pattern))));
    }

    return chunkedSpecs;
  }

  return _.chunk(allSpecs, expectedArrayLength);
};
