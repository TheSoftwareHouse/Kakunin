import inquirer from 'inquirer';
import mkdirp from 'mkdirp';
import fs from 'fs';

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

  async initConfig(advancedConfiguration = false) {
    const conf = {
      browserWidth: 1600,
      browserHeight: 900,
      timeout: 60,
      elementsVisibilityTimeout: 5,
      waitForPageTimeout: 5,
      downloadTimeout: 30,
      reports: '/reports',
      downloads: '/downloads',
      data: '/data',
      features: ['/features'],
      pages: ['/pages'],
      matchers: ['/matchers'],
      generators: ['/generators'],
      form_handlers: ['/form_handlers'],
      step_definitions: ['/step_definitions'],
      comparators: ['/comparators'],
      dictionaries: ['/dictionaries'],
      transformers: ['/transformers'],
      regexes: ['/regexes'],
      hooks: ['/hooks'],
      clearEmailInboxBeforeTests: false,
      clearCookiesAfterScenario: true,
      clearLocalStorageAfterScenario: true
    };

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
      conf.type = answer.type;
    });

    conf.baseUrl = await this.promptFolders('What is base url?', 'http://localhost:3000');

    if (advancedConfiguration) {
      conf.browserWidth = await this.promptFolders('What is desired browser width?', conf.browserWidth);
      conf.browserHeight = await this.promptFolders('What is desired browser height?', conf.browserHeight);

      conf.timeout = await this.promptFolders('What is desired step timeout in seconds?', conf.timeout);
      conf.elementsVisibilityTimeout = await this.promptFolders('What is desired elements visibility timeout in seconds?', conf.elementsVisibilityTimeout);
      conf.waitForPageTimeout = await this.promptFolders('How long should I wait for page to load in seconds?', conf.waitForPageTimeout);
      conf.downloadTimeout = await this.promptFolders('How long should I wait for files to download in seconds?', conf.downloadTimeout);

      conf.reports = await this.promptFolders('Where are your reports stored?', conf.reports);
      conf.downloads = await this.promptFolders('Where are your downloads stored?', conf.downloads);
      conf.data = await this.promptFolders('Where is your data stored?', conf.data);

      conf.features = [await this.promptFolders('Where are your features stored?', conf.features)];
      conf.pages = [await this.promptFolders('Where are your pages stored?', conf.pages)];
      conf.matchers = [await this.promptFolders('Where are your matchers stored?', conf.matchers)];
      conf.generators = [await this.promptFolders('Where are your generators stored?', conf.generators)];
      conf.form_handlers = [await this.promptFolders('Where are your form handlers stored?', conf.form_handlers)];
      conf.step_definitions = [await this.promptFolders('Where are your step definitions stored?', conf.step_definitions)];
      conf.comparators = [await this.promptFolders('Where are your comparators stored?', conf.comparators)];
      conf.dictionaries = [await this.promptFolders('Where are your dictionaries stored?', conf.dictionaries)];
      conf.regexes = [await this.promptFolders('Where are your regexes stored?', conf.regexes)];
      conf.hooks = [await this.promptFolders('Where are your hooks stored?', conf.hooks)];
      conf.transformers = [await this.promptFolders('Where are your transformers stored?', conf.transformers)];

      conf.clearEmailInboxBeforeTests = await this.promptFolders('Should email inbox be cleared before tests?', conf.clearEmailInboxBeforeTests, 'confirm');
      conf.clearCookiesAfterScenario = await this.promptFolders('Should cookies be cleared after scenario?', conf.clearCookiesAfterScenario, 'confirm');
      conf.clearLocalStorageAfterScenario = await this.promptFolders('Should local storage be cleared after scenario?', conf.clearLocalStorageAfterScenario, 'confirm');
    }

    conf.accounts = {
      someAccount: {
        accounts: [
          {
            email: '',
            password: ''
          }
        ]
      }
    };

    await this.initEnv(conf.clearEmailInboxBeforeTests);

    this.createTemplateFile('/kakunin.conf.js', 'module.exports = ' + JSON.stringify(conf, null, 4));
  }

  async initEnv(configureEmailClient = false) {
    const envs = [];

    if (configureEmailClient) {
      envs.push('MAILTRAP_URL=' + await this.promptFolders('Define MAILTRAP_URL', 'https://mailtrap.io/api/v1'));
      envs.push('MAILTRAP_API_KEY=' + await this.promptFolders('Define MAILTRAP_API_KEY', ''));
      envs.push('MAILTRAP_INBOX_ID=' + await this.promptFolders('Define MAILTRAP_INBOX_ID', ''));
    }

    envs.push('FIXTURES_RELOAD_HOST=' + await this.promptFolders('Define FIXTURES_RELOAD_HOST', ''));

    this.createTemplateFile('/.env', envs.join('\n'));
  }

  async generateProjectStructure() {
    const config = require(process.cwd() + '/kakunin.conf.js');

    this.createProjectDirectory(config.reports);
    this.createProjectDirectory(config.downloads);
    this.createProjectDirectory(config.data);

    this.createProjectDirectory(config.features[0]);
    this.createProjectDirectory(config.pages[0]);
    this.createProjectDirectory(config.matchers[0]);
    this.createProjectDirectory(config.generators[0]);
    this.createProjectDirectory(config.form_handlers[0]);
    this.createProjectDirectory(config.step_definitions[0]);
    this.createProjectDirectory(config.comparators[0]);
    this.createProjectDirectory(config.dictionaries[0]);
    this.createProjectDirectory(config.regexes[0]);
    this.createProjectDirectory(config.hooks[0]);
    this.createProjectDirectory(config.transformers[0]);

    this.createTemplateFileWithContentFrom(config.features[0] + '/example.feature', 'example.feature');
    this.createTemplateFileWithContentFrom(config.pages[0] + '/page.js', 'page.js');
    this.createTemplateFileWithContentFrom(config.matchers[0] + '/matcher.js', 'matcher.js');
    this.createTemplateFileWithContentFrom(config.generators[0] + '/generator.js', 'generator.js');
    this.createTemplateFileWithContentFrom(config.step_definitions[0] + '/steps.js', 'steps.js');
    this.createTemplateFileWithContentFrom(config.regexes[0] + '/regex.js', 'regex.js');
    this.createTemplateFileWithContentFrom(config.hooks[0] + '/hook.js', 'hook.js');
  }
}

export default new Initializer();
