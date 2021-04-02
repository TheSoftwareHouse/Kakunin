#!/usr/bin/env node
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as childProcess from 'child_process';
import * as envfile from 'node-env-file';
import { createTagsCLIArgument, filterCLIArguments, getConfigPath, isInitCommand } from './core/cli/cli.helper';
import initializer from './core/cli/initializer';
const commandArgs = require('minimist')(process.argv.slice(2));

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

  if (
    !fs.existsSync(
      path.join(
        process.cwd(),
        'node_modules',
        'protractor',
        'node_modules',
        'webdriver-manager',
        'selenium',
        'update-config.json'
      )
    )
  ) {
    childProcess.execSync(
      path.join(process.cwd(), 'node_modules', '.bin', 'webdriver-manager update --ie --versions.standalone=3.14.0')
    );
  }

  childProcess
    .spawn(path.join('node_modules', '.bin', protractorExecutable), argv, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
    .once('exit', (code) => {
      console.log('Protractor has finished');
      process.exit(code);
    });
}
