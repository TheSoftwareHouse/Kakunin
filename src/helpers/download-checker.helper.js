import fs from 'fs';
import config from './config.helper';

const DownloadChecker = {
  wasDownloaded: function (expectedFileName) {
    return browser.driver.wait(function () {
      return fs.existsSync(config.projectPath + config.downloads + '/' + expectedFileName);
    }, 30000);
  }
};

export default DownloadChecker;
