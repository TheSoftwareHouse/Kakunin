const { hookHandlers } = require('kakunin');
const {Before} = require('kakunin');
const hookExample = require('./hook-example');

hookHandlers.addHandler(hookExample);
hookHandlers.handleHook();

Before(() => {
  console.log('If you can see this in console then hook is working properly.');
});
