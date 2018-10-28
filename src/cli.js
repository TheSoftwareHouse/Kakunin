#!/usr/bin/env node
import initializer from './helpers/initializer';
import { isInitCommand, getConfigPath, createTagsCLIArgument, filterCLIArguments } from './helpers/cli.helper';

const commandArgs = require('minimist')(process.argv.slice(2));
const path = require('path');
const childProcess = require('child_process');
const envfile = require('node-env-file');
const os = require('os');

envfile(process.cwd() + '/.env', { raise: false, overwrite: false });

if (isInitCommand(process.argv)) {
  (async () => {
    await initializer.initConfig(commandArgs);
    await initializer.generateProjectStructure();
  })();
} else {
  const optionsToFilter = ['config', 'projectPath', 'disableChecks', 'tags'];

  const argv = [
    './node_modules/kakunin/dist/protractor.conf.js',
    `--config=${getConfigPath('kakunin.conf.js', commandArgs.config, process.cwd())}`,
    `--projectPath=${process.cwd()}`,
    '--disableChecks',
    ...createTagsCLIArgument(commandArgs),
    ...filterCLIArguments(optionsToFilter)(commandArgs),
  ];

  const protractorExecutable = os.platform() === 'win32' ? 'protractor.cmd' : 'protractor';

  childProcess
    .spawn(path.join('node_modules', '.bin', protractorExecutable), argv, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
    .once('exit', code => {
      console.log('Protractor has finished');
      process.exit(code);
    });
}
