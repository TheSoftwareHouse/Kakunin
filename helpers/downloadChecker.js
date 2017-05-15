const fs = require('fs');
const pascalConfig = require('../helpers/pascalConfig');

const DownloadChecker = {
  wasDownloaded: function (expectedFileName) {
    return browser.driver.wait(function () {
      return fs.existsSync(pascalConfig.projectPath + pascalConfig.downloads + '/' + expectedFileName);
    }, 30000);
  }
};

module.exports = DownloadChecker;
