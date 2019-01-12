import fs from 'fs';
import mkdirp from 'mkdirp';

export const prepareCatalogs = async directory => {
  if (fs.existsSync(directory)) {
    return Promise.resolve();
  }

  await mkdirp(directory);
  await console.log(`${directory} has been added!`);
  await fs.writeFileSync(`${directory}/.gitkeep`, '');
};
