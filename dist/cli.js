#!/usr/bin/env node
'use strict';

var _initializer = require('./helpers/initializer');

var _initializer2 = _interopRequireDefault(_initializer);

var _cli = require('./helpers/cli.helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const commandArgs = require('minimist')(process.argv.slice(2));
const path = require('path');
const child_process = require('child_process');
const envfile = require('node-env-file');
const os = require('os');

envfile(process.cwd() + '/.env', { raise: false, overwrite: false });

if ((0, _cli.isInitCommand)(process.argv)) {
  _asyncToGenerator(function* () {
    yield _initializer2.default.initConfig(commandArgs);
    yield _initializer2.default.generateProjectStructure();
  })();
} else {
  const optionsToFilter = ['config', 'projectPath', 'disableChecks', 'tags'];

  const argv = ['./node_modules/kakunin/dist/protractor.conf.js', `--config=${(0, _cli.getConfigPath)('kakunin.conf.js', commandArgs.config, process.cwd())}`, `--projectPath=${process.cwd()}`, '--disableChecks', ...(0, _cli.createTagsCLIArgument)(commandArgs), ...(0, _cli.filterCLIArguments)(optionsToFilter)(commandArgs)];

  const protractorExecutable = os.platform() === 'win32' ? 'protractor.cmd' : 'protractor';

  child_process.spawn(path.join('node_modules', '.bin', protractorExecutable), argv, {
    stdio: 'inherit',
    cwd: process.cwd()
  }).once('exit', code => {
    console.log('Protractor has finished');
    process.exit(code);
  });
}