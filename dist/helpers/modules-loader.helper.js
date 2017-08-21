'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModulesLoader {
  constructor(config) {
    this.paths = {
      comparators: [],
      dictionaries: [],
      form_handlers: [],
      generators: [],
      matchers: [],
      regexes: [],
      transformers: [],
      emails: []
    };

    Object.keys(this.paths).forEach(group => {
      if (typeof config[group] !== 'undefined') {
        config[group].forEach(groupPath => this.paths[group].push(_path2.default.join(config.projectPath + groupPath)));
      }
    });
  }

  getModules(group) {
    return this.getFilePaths(this.paths[group]).map(file => require(file[1]) // eslint-disable-line global-require
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

    folders.forEach(folder => {
      if (_fs2.default.existsSync(folder)) {
        files = files.concat(_fs2.default.readdirSync(folder).filter(file => file !== '.gitkeep' && file.indexOf('.spec.js') < 0).map(file => [file.substr(0, file.indexOf('.')), `${folder}/${file}`]));
      } else {
        console.log(`Directory ${folder} does not exist.`);
      }
    });

    return files;
  }
}

const create = exports.create = (configuration = _config2.default) => new ModulesLoader(configuration);