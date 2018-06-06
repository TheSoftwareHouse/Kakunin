import fs from 'fs';
import path from 'path';

export const deleteReports = (directory) => {
  return fs.readdirSync(directory)
    .filter(file => fs.statSync(path.join(directory, file)).isFile() && file !== '.gitkeep')
    .forEach(file => fs.unlinkSync(path.join(directory, file)));
};
