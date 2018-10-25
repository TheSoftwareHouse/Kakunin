export const prepareBrowserInstance = (browserConfig, specs) => {
  const instance = JSON.parse(JSON.stringify(browserConfig));
  instance.specs = specs;

  return instance;
};
