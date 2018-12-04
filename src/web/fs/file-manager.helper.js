import fs from 'fs';
import path from 'path';
import xlsx from 'node-xlsx';
import config from '../../core/config.helper';

const FileManager = {
  wasDownloaded: function(expectedFileName) {
    return browser.driver.wait(function() {
      return fs.existsSync(path.join(config.projectPath, config.downloads, expectedFileName));
    }, config.downloadTimeout * 1000);
  },

  parseXLS: function(expectedFileName) {
    return xlsx.parse(path.join(config.projectPath, config.downloads, expectedFileName))[0].data;
  },
};

export default FileManager;
