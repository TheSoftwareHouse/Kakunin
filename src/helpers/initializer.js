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
      intervalEmail: 5,
      elementsVisibilityTimeout: 5,
      waitForPageTimeout: 5,
      downloadTimeout: 30,
      emails: ['/emails'],
      reports: '/reports',
      performance: '/reports/performance',
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
      clearLocalStorageAfterScenario: true,
      email: null,
      headless: false,
      noGpu: false
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
    await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'type',
        message: 'What kind of email service would you like to use?',
        choices: [
          { name: 'None', value: 'none' },
          { name: 'Custom (you will have to fill configuration on your own)', value: 'custom' },
          { name: 'MailTrap', value: 'mailtrap' }
        ]
      }
    ]).then(function (answer) {
      if (answer.type !== 'none') {
        conf.email = {
          type: answer.type
        };
      }
    });

    if (conf.email && conf.email.type === 'mailtrap') {
      conf.email = {
        ...conf.email,
        config: {
          url: 'https://mailtrap.io/api/v1',
          apiKey: '',
          inboxId: ''
        }
      };

      conf.email.config.apiKey = await this.promptFolders('Type in your mailtrap apikey:', conf.email.config.apiKey);
      conf.email.config.inboxId = await this.promptFolders('Type in your mailtrap inboxId:', conf.email.config.inboxId);
    }

    if (advancedConfiguration) {
      await this.initEnv();
      conf.browserWidth = parseInt(await this.promptFolders('What is desired browser width?', conf.browserWidth));
      conf.browserHeight = parseInt(await this.promptFolders('What is desired browser height?', conf.browserHeight));

      conf.timeout = parseInt(await this.promptFolders('What is desired step timeout in seconds?', conf.timeout));
      conf.intervalEmail = parseInt(await this.promptFolders('What is desired step email interval in seconds?', conf.intervalEmail));
      conf.elementsVisibilityTimeout = parseInt(await this.promptFolders('What is desired elements visibility timeout in seconds?', conf.elementsVisibilityTimeout));
      conf.waitForPageTimeout = parseInt(await this.promptFolders('How long should I wait for page to load in seconds?', conf.waitForPageTimeout));
      conf.downloadTimeout = parseInt(await this.promptFolders('How long should I wait for files to download in seconds?', conf.downloadTimeout));

      conf.reports = await this.promptFolders('Where are your reports stored?', conf.reports);
      conf.downloads = await this.promptFolders('Where are your downloads stored?', conf.downloads);
      conf.data = await this.promptFolders('Where is your data stored?', conf.data);

      conf.features = [await this.promptFolders('Where are your features stored?', conf.features[0])];
      conf.pages = [await this.promptFolders('Where are your pages stored?', conf.pages[0])];
      conf.matchers = [await this.promptFolders('Where are your matchers stored?', conf.matchers[0])];
      conf.generators = [await this.promptFolders('Where are your generators stored?', conf.generators[0])];
      conf.form_handlers = [await this.promptFolders('Where are your form handlers stored?', conf.form_handlers[0])];
      conf.step_definitions = [await this.promptFolders('Where are your step definitions stored?', conf.step_definitions[0])];
      conf.comparators = [await this.promptFolders('Where are your comparators stored?', conf.comparators[0])];
      conf.dictionaries = [await this.promptFolders('Where are your dictionaries stored?', conf.dictionaries[0])];
      conf.regexes = [await this.promptFolders('Where are your regexes stored?', conf.regexes[0])];
      conf.hooks = [await this.promptFolders('Where are your hooks stored?', conf.hooks[0])];
      conf.transformers = [await this.promptFolders('Where are your transformers stored?', conf.transformers[0])];

      conf.clearEmailInboxBeforeTests = await this.promptFolders('Should email inbox be cleared before tests?', conf.clearEmailInboxBeforeTests, 'confirm');
      conf.clearCookiesAfterScenario = await this.promptFolders('Should cookies be cleared after scenario?', conf.clearCookiesAfterScenario, 'confirm');
      conf.clearLocalStorageAfterScenario = await this.promptFolders('Should local storage be cleared after scenario?', conf.clearLocalStorageAfterScenario, 'confirm');
      conf.browserMob = {
        serverPort: parseInt(await this.promptFolders('Define port where browsermob-proxy is running!', 8887)),
        port: parseInt(await this.promptFolders('Define port where browsermob-proxy should be listening!', 8888)),
        host: await this.promptFolders('Define host where browsermob-proxy is running!', 'localhost')
      };
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

    this.createTemplateFile('/kakunin.conf.js', 'module.exports = ' + JSON.stringify(conf, null, 4));
  }

  async initEnv() {
    const envs = [];

    envs.push('FIXTURES_RELOAD_HOST=' + await this.promptFolders('Define FIXTURES_RELOAD_HOST', ''));

    this.createTemplateFile('/.env', envs.join('\n'));
  }

  async generateProjectStructure() {
    const config = require(process.cwd() + '/kakunin.conf.js');

    this.createProjectDirectory(config.reports);
    this.createProjectDirectory(config.performance);
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
    this.createProjectDirectory(config.emails[0]);

    this.createTemplateFile(config.performance + '/.gitkeep', '');
    this.createTemplateFile(config.reports + '/.gitkeep', '');
    this.createTemplateFile(config.downloads + '/.gitkeep', '');
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
