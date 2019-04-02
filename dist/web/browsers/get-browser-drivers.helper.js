"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.getBrowsersDrivers = (commandArgs) => {
    const drivers = [];
    const pathToDrivers = './node_modules/protractor/node_modules/webdriver-manager/selenium';
    if (commandArgs.ie) {
        // This is required as Protractor cannot find IEDriverServer. The other drivers does not require any additional configuration.
        const availableDrivers = fs.readdirSync(pathToDrivers);
        const IEDriver = availableDrivers.filter(item => item.match('IEDriverServer([0-9].[0-9]{3}.[0-9]).exe'))[0];
        drivers.push(`-Dwebdriver.ie.driver=${pathToDrivers}/${IEDriver}`);
    }
    return drivers;
};
