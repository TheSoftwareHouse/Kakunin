const fs = require('fs');
const xlsx = require('node-xlsx');
const pascalConfig = require('../helpers/pascalConfig');

const FileManager = {
  wasDownloaded: function (expectedFileName) {
    return browser.driver.wait(function() {
      return fs.existsSync(pascalConfig.projectPath + pascalConfig.downloads + '/' + expectedFileName);
    }, 20000);
  },

  parseXLS: function (expectedFileName) {
    return xlsx.parse(pascalConfig.projectPath + pascalConfig.downloads + '/' + expectedFileName)[0].data;
  }
};

module.exports = FileManager;
