#!/usr/bin/env node
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const commandArgs = require('minimist')(process.argv.slice(2));
const path = require('path');
const child_process = require('child_process');
const envfile = require('node-env-file');
const initializer = require('./helpers/initializer');

const isInitCommand = () => {
  return process.argv.length > 2 && process.argv[2] === 'init';
};

const getConfigPath = () => {
  const configFile = 'kakunin.conf.js';

  return commandArgs.config ? process.cwd() + '/' + commandArgs.config : process.cwd() + '/' + configFile;
};

const getScenariosTags = () => {
  const tags = [];

  if (commandArgs.tags !== undefined) {
    tags.push('--cucumberOpts.tags');
    tags.push(commandArgs.tags);
  }

  return tags;
};

envfile(process.cwd() + '/.env', { raise: false, overwrite: false });

if (isInitCommand()) {
  _asyncToGenerator(function* () {
    yield initializer.initConfig();
    yield initializer.initEnv();
    yield initializer.generateProjectStructure();
  })();
} else {
  const optionsToFilter = ['config', 'projectPath', 'disableChecks', 'tags'];

  const commandLineArgs = [];

  for (const prop in commandArgs) {
    if (prop !== '_' && !optionsToFilter.includes(prop)) {
      commandLineArgs.push(`--${prop}=${commandArgs[prop]}`);
    }
  }

  const argv = ['./dist/protractor.conf.js', `--config=${getConfigPath()}`, `--projectPath=${process.cwd()}`, '--disableChecks', ...getScenariosTags(), ...commandLineArgs];

  child_process.spawn(path.join('node_modules', '.bin', 'protractor'), argv, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  }).once('close', () => {
    console.log('Protractor has finished');
  });
}