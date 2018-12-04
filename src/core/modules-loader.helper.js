import fs from 'fs';
import path from 'path';
import configHelper from './config.helper';

class ModulesLoader {
  constructor(configuration) {
    this.paths = {
      comparators: [],
      dictionaries: [],
      form_handlers: [],
      generators: [],
      matchers: [],
      regexes: [],
      transformers: [],
      emails: [],
    };

    Object.keys(this.paths).forEach(group => {
      if (typeof configHelper[group] !== 'undefined') {
        configuration[group].forEach(groupPath => {
          this.paths[group].push(path.join(configuration.projectPath + groupPath));
        });
      }
    });
  }

  getModules(group) {
    return this.getFilePaths(this.paths[group]).map(
      file => require(file[1]) // eslint-disable-line global-require
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

  // eslint-disable-next-line class-methods-use-this
  getFilePaths(folders) {
    let files = [];

    folders.forEach(folder => {
      if (fs.existsSync(folder)) {
        files = files.concat(
          fs
            .readdirSync(folder)
            .filter(file => file !== '.gitkeep' && file.indexOf('.spec.js') < 0)
            .map(file => [file.substr(0, file.indexOf('.')), `${folder}/${file}`])
        );
      } else {
        console.log(`Directory ${folder} does not exist.`);
      }
    });

    return files;
  }
}

export const create = (configuration = configHelper) => new ModulesLoader(configuration);
