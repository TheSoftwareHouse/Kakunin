'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let config;

if (process.env.NODE_ENV === 'test') {
  config = {
    projectPath: process.cwd()
  };
} else {
  const configFile = process.argv.find(name => name.indexOf('--config') >= 0);
  const configFilePath = configFile.substr(configFile.indexOf('=') + 1);

  const project = process.argv.find(name => name.indexOf('--projectPath') >= 0);
  const projectPath = project.substr(project.indexOf('=') + 1);

  config = require(configFilePath); // eslint-disable-line global-require
  config.projectPath = projectPath;
}

exports.default = config;