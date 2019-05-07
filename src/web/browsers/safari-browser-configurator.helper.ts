import * as path from 'path';
import * as shell from 'shelljs';

export const safariBrowserConfigurator = config => {
  shell.exec(`defaults write -app Safari DownloadsPath ${path.join(config.projectPath, config.downloads)}`);
};
