'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let pascalConfig;

if (process.env.NODE_ENV === 'test') {
  pascalConfig = {
    projectPath: process.cwd()
  };
} else {
  const pascalConf = process.argv.find(name => name.indexOf('--pascalConfig') >= 0);
  const pascalConfigPath = pascalConf.substr(pascalConf.indexOf('=') + 1);

  const project = process.argv.find(name => name.indexOf('--projectPath') >= 0);
  const projectPath = project.substr(project.indexOf('=') + 1);

  pascalConfig = require(pascalConfigPath); // eslint-disable-line global-require
  pascalConfig.projectPath = projectPath;
}

exports.default = pascalConfig;