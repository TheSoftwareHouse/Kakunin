import * as Joi from '@hapi/joi';
import chalk from 'chalk';

const schema = Joi.object({
  browserWidth: Joi.number()
    .min(100)
    .max(2000)
    .required(),
  browserHeight: Joi.number()
    .min(100)
    .max(2000)
    .required(),
  browserLanguage: Joi.string().required(),
  timeout: Joi.number()
    .min(1)
    .required(),
  elementsVisibilityTimeout: Joi.number()
    .min(1)
    .required(),
  waitForPageTimeout: Joi.number()
    .min(1)
    .required(),
  downloadTimeout: Joi.number()
    .min(1)
    .required(),
  reports: Joi.string().required(),
  downloads: Joi.string().required(),
  data: Joi.string().required(),
  features: Joi.array()
    .items(Joi.string())
    .required(),
  pages: Joi.array()
    .items(Joi.string())
    .required(),
  matchers: Joi.array()
    .items(Joi.string())
    .required(),
  generators: Joi.array()
    .items(Joi.string())
    .required(),
  form_handlers: Joi.array()
    .items(Joi.string())
    .required(),
  step_definitions: Joi.array()
    .items(Joi.string())
    .required(),
  comparators: Joi.array()
    .items(Joi.string())
    .required(),
  dictionaries: Joi.array()
    .items(Joi.string())
    .required(),
  transformers: Joi.array()
    .items(Joi.string())
    .required(),
  regexes: Joi.array()
    .items(Joi.string())
    .required(),
  hooks: Joi.array()
    .items(Joi.string())
    .required(),
  imageComparator: {
    baselineFolder: Joi.string().required(),
    temporaryFolder: Joi.string().required(),
    saveAboveTolerance: Joi.number()
      .min(1)
      .max(99)
      .required(),
  },
  clearEmailInboxBeforeTests: Joi.boolean().required(),
  clearCookiesAfterScenario: Joi.boolean().required(),
  clearLocalStorageAfterScenario: Joi.boolean().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .allow(null),
  headless: Joi.boolean().required(),
  noGpu: Joi.boolean().required(),
  type: Joi.string()
    .valid('ng1', 'ng2', 'otherWeb')
    .required(),
  baseUrl: Joi.string()
    .pattern(/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/)
    .required(),
  apiUrl: Joi.string()
    .pattern(/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/)
    .required(),
  browserMob: {
    serverPort: Joi.number().required(),
    port: Joi.number().required(),
    host: Joi.string().required(),
  },
  browserstack: {
    seleniumAddress: Joi.string().pattern(/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/),
    defaultPort: Joi.number(),
    capabilities: {
      'browserstack.user': Joi.string()
        .alphanum()
        .empty(''),
      'browserstack.key': Joi.string()
        .alphanum()
        .empty(''),
      'browserstack.local': Joi.boolean().required(),
      browserName: Joi.string()
        .valid('firefox', 'chrome', 'IE', 'safari', 'opera')
        .required(),
    },
  },
  accounts: {
    someAccount: {
      accounts: Joi.array().items(Joi.object()),
    },
  },
  performance: Joi.boolean().required(),
});

export const validateConfig = config => {
  const { value, error } = schema.validate({ ...config }, { allowUnknown: true });

  if (error) {
    console.log(chalk.green(`This is error output:`), chalk.red(error.details[0].message));
    throw Error(chalk.yellow('There are some errors in kakunin.conf.js. Please fix them and try again'));
  }

  return value;
};
