import * as _ from 'lodash';

export const prepareBrowserInstance = (browserConfig, specs) => {
  const instance = _.cloneDeep(browserConfig);
  instance.specs = specs;

  return instance;
};
