import * as browserstack from 'browserstack-local';
import * as chalk from 'chalk';
import * as shell from 'shelljs';
import config from '../../core/config.helper';

export const disconnectBrowserstack = (browserstackEnabled: boolean) => {
  if (browserstackEnabled && config.browserstack) {
    const browserstackPid = shell.exec(`lsof -t -i :${config.browserstack.defaultPort}`).stdout;

    if (browserstackPid.length > 0) {
      return shell.exec(`kill -9 ${browserstackPid}`);
    }
  }

  return Promise.resolve();
};

export const connectBrowserstack = (browserstackKey: string) => {
  console.log(
    chalk.black.bgYellow(
      'Keep in mind that Browserstack capabilities cannot be used with the local. Check the documentation for more information!'
    )
  );

  disconnectBrowserstack(true);

  return new Promise((resolve, reject) => {
    const bsLocal = new browserstack.Local();
    bsLocal.start({ key: browserstackKey }, (error) => {
      if (error) {
        return reject(error);
      }
      console.log('Connected to the Browsertack Selenium server! Now testing...');
      resolve(true);
    });
  });
};
