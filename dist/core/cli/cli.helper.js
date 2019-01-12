'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterCLIArguments = exports.createTagsCLIArgument = exports.getConfigPath = exports.isInitCommand = undefined;

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const isInitCommand = exports.isInitCommand = args => {
  if (Array.isArray(args)) {
    return args.length > 2 && args[2] === 'init';
  }

  return false;
};

const getConfigPath = exports.getConfigPath = (configFile, argsConfig, basePath) => {
  return argsConfig ? path.join(basePath, argsConfig) : path.join(basePath, configFile);
};

const createTagsCLIArgument = exports.createTagsCLIArgument = commandArgs => {
  const tags = [];

  if (commandArgs.performance) {
    if (commandArgs.tags !== undefined && commandArgs.tags.indexOf('@performance') < 0) {
      tags.push('--cucumberOpts.tags');
      tags.push(`${commandArgs.tags} and @performance`);
    } else if (commandArgs.tags === undefined) {
      tags.push('--cucumberOpts.tags');
      tags.push('@performance');
    } else {
      tags.push('--cucumberOpts.tags');
      tags.push(commandArgs.tags);
    }
  } else if (commandArgs.tags !== undefined) {
    tags.push('--cucumberOpts.tags');
    tags.push(commandArgs.tags);
  }

  return tags;
};

const filterCLIArguments = exports.filterCLIArguments = blackList => commandArgs => {
  const commandLineArgs = [];

  for (const prop in commandArgs) {
    if (prop !== '_' && !blackList.includes(prop)) {
      if (commandArgs[prop] === true || commandArgs[prop] === false) {
        commandLineArgs.push(`--${prop}`);
      } else {
        commandLineArgs.push(`--${prop}=${commandArgs[prop]}`);
      }
    }
  }

  return commandLineArgs;
};