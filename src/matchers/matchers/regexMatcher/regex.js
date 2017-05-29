const extend = require('extend');
const modulesLoader = require('../../../helpers/modulesLoader').create();

const availableRegexes = modulesLoader.getModules('regexes');

let regexes = {};

availableRegexes.forEach(regex => extend(true, regexes, regex));

module.exports = regexes;
