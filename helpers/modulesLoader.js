const fs = require('fs');

const pascalConfig = require('./pascalConfig');

class ModulesLoader {

  getModules(projectFolders, pascalFolders) {
    return this.getFilePaths(projectFolders, pascalFolders).map(file => require(file[1]));
  }

  getModulesAsObject(projectFolders, pascalFolders) {
    const modules = {};
    const filePaths = this.getFilePaths(projectFolders, pascalFolders);

    filePaths.forEach(file => {
      modules[file[0]] = require(file[1]);
    });

    return modules;
  }

  getFilePaths(projectFolders, pascalFolders) {
    projectFolders = projectFolders.map(folder => pascalConfig.projectPath + folder);

    const folders = [...projectFolders, ...pascalFolders];
    let files = [];

    folders.forEach(
      folder => {
        if (fs.existsSync(folder)) {
          files = files.concat(fs
            .readdirSync(folder)
            .filter(file => file !== '.gitkeep')
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

module.exports = new ModulesLoader();
