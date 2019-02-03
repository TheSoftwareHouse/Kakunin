import * as fs from 'fs';
import * as path from 'path';
import config from '../../core/config.helper';

const DownloadChecker = {
  wasDownloaded(expectedFileName) {
    return browser.driver.wait(() => {
      return fs.existsSync(path.join(config.projectPath, config.downloads, expectedFileName));
    }, config.downloadTimeout * 1000);
  },
};

export default DownloadChecker;
