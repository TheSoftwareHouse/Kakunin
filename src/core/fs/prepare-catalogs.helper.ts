import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export const prepareCatalogs = directory => {
  if (fs.existsSync(directory)) {
    return Promise.resolve();
  }

  mkdirp(directory, null);
  console.log(`${directory} has been added!`);
  fs.writeFileSync(`${directory}/.gitkeep`, '');
};
