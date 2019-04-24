import { After, Before } from 'cucumber';
import { HookHandler } from '../hook-handler.interface';
import * as fs from 'fs';
import * as path from 'path';
import config from '../../../../core/config.helper';

const clearDownload = callback => {
  const files = fs.readdirSync(path.join(config.projectPath, config.downloads)).filter(file => file !== '.gitkeep');

  for (const file of files) {
    fs.unlinkSync(path.join(config.projectPath, config.downloads, file));
  }

  callback();
};

class ClearDownloadHook implements HookHandler {
  public handleHook() {
    Before('@downloadClearBefore', (scenario, callback) => {
      clearDownload(callback);
    });

    After('@downloadClearAfter', (scenario, callback) => {
      clearDownload(callback);
    });
  }

  public getPriority() {
    return 1;
  }
}

export const clearDownloadHook = new ClearDownloadHook();
