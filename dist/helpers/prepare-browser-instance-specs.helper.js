"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const prepareBrowserInstance = exports.prepareBrowserInstance = (browserConfig, specs) => {
  const instance = JSON.parse(JSON.stringify(browserConfig));
  instance.specs = specs;

  return instance;
};