import * as fs from 'fs';
import * as xlsx from 'node-xlsx';
import * as path from 'path';
import config from '../../core/config.helper';

const FileManager = {
  wasDownloaded(expectedFileName) {
    return browser.driver.wait(() => {
      return fs.existsSync(path.join(config.projectPath, config.downloads, expectedFileName));
    }, config.downloadTimeout * 1000);
  },

  parseXLS(expectedFileName) {
    return xlsx.parse(path.join(config.projectPath, config.downloads, expectedFileName))[0].data;
  },
};

export default FileManager;
