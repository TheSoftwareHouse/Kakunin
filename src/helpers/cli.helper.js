import * as path from 'path';

export const isInitCommand = (args) => {
  if (Array.isArray(args)) {
    return args.length > 2 && args[2] === 'init';
  }

  return false;
};

export const getConfigPath = (configFile, argsConfig, basePath) => {
  return argsConfig
    ? path.join(basePath, argsConfig)
    : path.join(basePath, configFile);
};

export const createTagsCLIArgument = (commandArgs) => {
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

export const filterCLIArguments = blackList => commandArgs => {
  const commandLineArgs = [];

  for (const prop in commandArgs) {
    if (prop !== '_' && !blackList.includes(prop)) {
      if (commandArgs[prop] === true || commandArgs[prop] === false) {
        commandLineArgs.push(`--${prop}`);
      } else  {
        commandLineArgs.push(`--${prop}=${commandArgs[prop]}`);
      }
    }
  }

  return commandLineArgs;
};