import * as fs from 'fs';

export const getBrowsersDrivers = (commandArgs): string[] => {
  const drivers: string[] = [];
  const pathToDrivers = './node_modules/protractor/node_modules/webdriver-manager/selenium';

  if (commandArgs.ie) {
    // This is required as Protractor cannot find IEDriverServer. The other drivers does not require any additional configuration.
    const availableDrivers = fs.readdirSync(pathToDrivers);
    const IEDriver = availableDrivers.filter(item => item.match('IEDriverServer([0-9].[0-9]{3}.[0-9]).exe'))[0];

    drivers.push(`-Dwebdriver.ie.driver=${pathToDrivers}/${IEDriver}`);
  }

  return drivers;
};
