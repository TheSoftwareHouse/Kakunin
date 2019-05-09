# Kakunin - automated testing framework
#### Migration to 2.0.0 version

What needs to be done:
1. Change Hooks

In the version before 3.0.0 we had a single file located in the `./hook` directory.

Example of `hook.js`:

```javascript
const { Before, After } = require('kakunin');

Before(() => {
  console.log('If you can see this in console then hook is working properly.');
});

After(() => {
  console.log('Console log after the scenario');
});
```

Currently, the interface to set priorities has been added. So we can control if the hook `FirstExample` will be executed before `SecondExample`.


Example of `first-example.hook.js`:

```javascript
const { hookHandlers, Before } = require('kakunin');

class FirstExampleHook {
  initializeHook() {
    Before(() => {
      console.log('First example hook');
    });
  }

  getPriority() {
    return 990;
  }
}

hookHandlers.addHook(new FirstExampleHook());

```

