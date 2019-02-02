import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export const prepareCatalogs = async directory => {
  if (fs.existsSync(directory)) {
    return Promise.resolve();
  }

  await mkdirp(directory, null);
  await console.log(`${directory} has been added!`);
  await fs.writeFileSync(`${directory}/.gitkeep`, '');
};
