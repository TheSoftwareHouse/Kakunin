import * as Joi from '@hapi/joi';
import * as chalk from 'chalk';

const schema = Joi.object({
  baseUrl: Joi.string()
    .pattern(/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/)
    .required(),
  type: Joi.string().valid('ng1', 'ng2', 'otherWeb').required(),
  browserWidth: Joi.number(),
  browserHeight: Joi.number(),
  browserLanguage: Joi.string(),
  chromeOptionsAdditionalArgs: Joi.array().items(Joi.string()),
  timeout: Joi.number().min(1).required(),
  intervalEmail: Joi.number(),
  maxEmailRepeats: Joi.number(),
  elementsVisibilityTimeout: Joi.number().min(1),
  waitForPageTimeout: Joi.number().min(1),
  downloadTimeout: Joi.number().min(1),
  emails: Joi.array().items(Joi.string()),
  reports: Joi.string().required(),
  downloads: Joi.string(),
  data: Joi.string(),
  features: Joi.array().items(Joi.string()).required(),
  pages: Joi.array().items(Joi.string()).required(),
  matchers: Joi.array().items(Joi.string()),
  generators: Joi.array().items(Joi.string()),
  form_handlers: Joi.array().items(Joi.string()),
  step_definitions: Joi.array().items(Joi.string()).required(),
  comparators: Joi.array().items(Joi.string()),
  dictionaries: Joi.array().items(Joi.string()),
  transformers: Joi.array().items(Joi.string()),
  regexes: Joi.array().items(Joi.string()),
  hooks: Joi.array().items(Joi.string()),
  imageComparator: Joi.object()
    .keys({
      baselineFolder: Joi.string().required(),
      temporaryFolder: Joi.string(),
      saveAboveTolerance: Joi.number().min(0).max(99),
    })
    .required(),
  clearEmailInboxBeforeTests: Joi.boolean(),
  clearCookiesAfterScenario: Joi.boolean(),
  clearLocalStorageAfterScenario: Joi.boolean(),
  email: Joi.any(),
  headless: Joi.boolean(),
  noGpu: Joi.boolean(),
  browserMob: Joi.any(),
  accounts: {
    someAccount: {
      accounts: Joi.array().items(Joi.object()),
    },
  },
  performance: Joi.boolean(),
});

export const validateConfig = (config) => {
  const { value, error } = schema.validate({ ...config }, { allowUnknown: true });

  if (error) {
    console.log(chalk.green(`This is error output:`), chalk.red(error.details[0].message));
    throw Error(chalk.yellow('There are some errors in kakunin.conf.js. Please fix them and try again'));
  }

  return value;
};
