import fs from 'fs';
import path from 'path';
import config from './config.helper';

const DownloadChecker = {
  wasDownloaded: function(expectedFileName) {
    return browser.driver.wait(function() {
      return fs.existsSync(path.join(config.projectPath, config.downloads, expectedFileName));
    }, config.downloadTimeout * 1000);
  },
};

export default DownloadChecker;
