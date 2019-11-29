---
id: version-3.0.1-hooks
title: Hooks
original_id: hooks
---
# Hooks for Kakunin tests

This section explains how to add priority hooks for kakunin tests based on the built-in adapter.
Hooks allow you to perform actions before and after scenario. 
For example, it lets you clear all files from the downloads folder.



## How to add hook with priority:
##### initializeHook()
 - this method is provided to execute hook logic.
##### getPriority()
 - this method returns numeric value and then it's sorted in order.

```text 
Remember that new Hook must contain these 2 methods to fulfill interface.
```

After your hook is ready to use method `hookHandlers.addHook(Hook object)`


### Example of example.hook.js:
```typescript
const { hookHandlers, Before } = require('kakunin');

class ExampleHook {
  initializeHook() {
    Before(() => {
      console.log('This hook is going to be 5th in order');
    });
  }

  getPriority() {
    return 5;
  }
}

hookHandlers.addHook(new ExampleHook());
```

### Build in hooks:

#### Clear download: 
  - Clears download folder before or/and after scenario. To use them add `@downloadClearBefore` or `@downloadClearAfter` tag.
  Its priority is set to 1.
#### Reload fixtures: 
  - allows you to reload fixtures before the desired scenario, via URL provided in `.env` file.
  Its priority is set to 2.
#### Take a screenshot and clear variables:
  - These hooks are used by kakunin mechanism to clear variable store and take screenshots after scenarios.
    Their priority is set to 1.
