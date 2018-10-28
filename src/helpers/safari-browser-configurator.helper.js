import shell from 'shelljs';
import path from 'path';

export const safariBrowserConfigurator = config => {
  shell.exec(`defaults write -app Safari DownloadsPath ${path.join(config.projectPath, config.downloads)}`);
};
