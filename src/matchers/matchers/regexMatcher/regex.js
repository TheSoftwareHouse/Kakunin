const extend = require('extend');
const fs = require('fs');
const pascalConfig = require('../../../helpers/pascalConfig');
const modulesLoader = require('../../../helpers/modulesLoader');

const availableRegexes = modulesLoader.getModules(pascalConfig.regexes, [__dirname + '/regexes']);

let regexes = {};

availableRegexes.forEach(regex => extend(true, regexes, regex));

module.exports = regexes;
