const inquirer = require('inquirer');
const mkdirp = require('mkdirp');
const fs = require('fs');

class Initializer {
  createProjectDirectory(path) {
    const projectPath = process.cwd() + path;

    mkdirp(projectPath);

    console.log(`Created directory at path ${projectPath}`);
  }

  createTemplateFile(path, content) {
    const filePath = process.cwd() + path;

    fs.writeFileSync(filePath, content);

    console.log(`Created file at path ${filePath}`);
  }

  createTemplateFileWithContentFrom(path, file) {
    const content = fs.readFileSync(__dirname + '/../templates/' + file);

    this.createTemplateFile(path, content);
  }

  async promptFolders(message, defaultValue, type = 'input') {
    let fullMessage = message;

    if (defaultValue !== '') {
      fullMessage += ` [${defaultValue}]`;
    }

    return await inquirer.prompt([
      {
        type: type,
        name: 'input',
        message: fullMessage
      }
    ]).then(function (answer) {
      return answer.input === '' ? defaultValue : answer.input;
    });
  }

  async initConfig() {
    const pascalConf = {};

    await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'type',
        message: 'What kind of application would you like to test?',
        choices: [
          { name: 'Angular 1', value: 'ng1' },
          { name: 'Angular 2', value: 'ng2' },
          { name: 'Other web app (e.g. React, jQuery based etc.)', value: 'otherWeb' }
        ]
      }
    ]).then(function (answer) {
      pascalConf.type = answer.type;
    });

    pascalConf.baseUrl = await this.promptFolders('What is base url?', 'http://localhost:3000');

    pascalConf.browserWidth = await this.promptFolders('What is desired browser width?', 1600);
    pascalConf.browserHeight = await this.promptFolders('What is desired browser height?', 900);

    pascalConf.timeout = await this.promptFolders('What is desired step timeout in seconds?', 60);
    pascalConf.elementsVisibilityTimeout = await this.promptFolders('What is desired elements visibility timeout in seconds?', 5);

    pascalConf.reports = await this.promptFolders('Where are your reports stored?', '/reports');
    pascalConf.downloads = await this.promptFolders('Where are your downloads stored?', '/downloads');
    pascalConf.data = await this.promptFolders('Where is your data stored?', '/data');

    pascalConf.features = [await this.promptFolders('Where are your features stored?', '/features')];
    pascalConf.pages = [await this.promptFolders('Where are your pages stored?', '/pages')];
    pascalConf.matchers = [await this.promptFolders('Where are your matchers stored?', '/matchers')];
    pascalConf.generators = [await this.promptFolders('Where are your generators stored?', '/generators')];
    pascalConf.form_handlers = [await this.promptFolders('Where are your form handlers stored?', '/form_handlers')];
    pascalConf.step_definitions = [await this.promptFolders('Where are your step definitions stored?', '/step_definitions')];
    pascalConf.comparators = [await this.promptFolders('Where are your comparators stored?', '/comparators')];
    pascalConf.dictionaries = [await this.promptFolders('Where are your dictionaries stored?', '/dictionaries')];
    pascalConf.regexes = [await this.promptFolders('Where are your regexes stored?', '/regexes')];
    pascalConf.hooks = [await this.promptFolders('Where are your hooks stored?', '/hooks')];

    pascalConf.clearEmailInboxBeforeTests = await this.promptFolders('Should email inbox be cleared before tests?', '', 'confirm');
    pascalConf.clearCookiesAfterScenario = await this.promptFolders('Should cookies be cleared after scenario?', '', 'confirm');
    pascalConf.clearLocalStorageAfterScenario = await this.promptFolders('Should local storage be cleared after scenario?', '', 'confirm');

    pascalConf.accounts = {
      someAccount: {
        accounts: [
          {
            email: '',
            password: ''
          }
        ]
      }
    };

    this.createTemplateFile('/pascal.conf.js', 'module.exports = ' + JSON.stringify(pascalConf, null, 4));
  }

  async initEnv() {
    const envs = [];

    envs.push('MAILTRAP_URL=' + await this.promptFolders('Define MAILTRAP_URL', 'https://mailtrap.io/api/v1'));
    envs.push('MAILTRAP_API_KEY=' + await this.promptFolders('Define MAILTRAP_API_KEY', ''));
    envs.push('MAILTRAP_INBOX_ID=' + await this.promptFolders('Define MAILTRAP_INBOX_ID', ''));
    envs.push('FIXTURES_RELOAD_HOST=' + await this.promptFolders('Define FIXTURES_RELOAD_HOST', ''));

    this.createTemplateFile('/.env', envs.join('\n'));
  }

  async generateProjectStructure() {
    const pascalConfig = require(process.cwd() + '/pascal.conf.js');

    this.createProjectDirectory(pascalConfig.reports);
    this.createProjectDirectory(pascalConfig.downloads);
    this.createProjectDirectory(pascalConfig.data);

    this.createProjectDirectory(pascalConfig.features[0]);
    this.createProjectDirectory(pascalConfig.pages[0]);
    this.createProjectDirectory(pascalConfig.matchers[0]);
    this.createProjectDirectory(pascalConfig.generators[0]);
    this.createProjectDirectory(pascalConfig.form_handlers[0]);
    this.createProjectDirectory(pascalConfig.step_definitions[0]);
    this.createProjectDirectory(pascalConfig.comparators[0]);
    this.createProjectDirectory(pascalConfig.dictionaries[0]);
    this.createProjectDirectory(pascalConfig.regexes[0]);
    this.createProjectDirectory(pascalConfig.hooks[0]);

    this.createTemplateFileWithContentFrom(pascalConfig.features[0] + '/example.feature', 'example.feature');
    this.createTemplateFileWithContentFrom(pascalConfig.pages[0] + '/page.js', 'page.js');
    this.createTemplateFileWithContentFrom(pascalConfig.matchers[0] + '/matcher.js', 'matcher.js');
    this.createTemplateFileWithContentFrom(pascalConfig.generators[0] + '/generator.js', 'generator.js');
    this.createTemplateFileWithContentFrom(pascalConfig.step_definitions[0] + '/steps.js', 'steps.js');
    this.createTemplateFileWithContentFrom(pascalConfig.regexes[0] + '/regex.js', 'regex.js');
    this.createTemplateFileWithContentFrom(pascalConfig.hooks[0] + '/hook.js', 'hook.js');
  }
}

module.exports = new Initializer();
