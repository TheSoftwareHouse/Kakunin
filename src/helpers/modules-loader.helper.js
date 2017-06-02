import fs from 'fs';
import path from 'path';
import config from './config.helper';

class ModulesLoader {
  constructor(config) {
    this.paths = {
      comparators: [],
      dictionaries: [],
      form_handlers: [],
      generators: [],
      matchers: [],
      regexes: [],
      transformers: []
    };

    Object.keys(this.paths).forEach((group) => {
      if (typeof config[group] !== 'undefined') {
        config[group]
          .forEach((groupPath) => this.paths[group].push(
            path.join(config.projectPath + groupPath)
          ));
      }
    });
  }

  getModules(group) {
    return this
      .getFilePaths(
        this.paths[group]).map(file => require(file[1]) // eslint-disable-line global-require
      );
  }

  getModulesAsObject(projectFolders) {
    const modules = {};
    const filePaths = this.getFilePaths(projectFolders);

    filePaths.forEach(file => {
      modules[file[0]] = require(file[1]); // eslint-disable-line global-require
    });

    return modules;
  }

  getFilePaths(folders) {
    let files = [];

    folders.forEach(
      folder => {
        if (fs.existsSync(folder)) {
          files = files.concat(fs
            .readdirSync(folder)
            .filter(file => file !== '.gitkeep' && file.indexOf('.spec.js') < 0)
            .map(file => [
              file.substr(0, file.indexOf('.')),
              `${folder}/${file}`
            ])
          );
        } else {
          console.log(`Directory ${folder} does not exist.`);
        }
      }
    );

    return files;
  }
}

export const create = (configuration = config) => new ModulesLoader(configuration);
