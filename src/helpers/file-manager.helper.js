import fs from 'fs';
import xlsx from 'node-xlsx';
import config from './config.helper';

const FileManager = {
  wasDownloaded: function (expectedFileName) {
    return browser.driver.wait(function () {
      return fs.existsSync(config.projectPath + config.downloads + '/' + expectedFileName);
    }, 20000);
  },

  parseXLS: function (expectedFileName) {
    return xlsx.parse(config.projectPath + config.downloads + '/' + expectedFileName)[0].data;
  }
};

export default FileManager;
