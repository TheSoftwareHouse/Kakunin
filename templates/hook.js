const { hookHandlers, Before } = require('kakunin');

class TestHook {
  initializeHook() {
    Before(() => {
      console.log('Standard hook');
    });
  }

  getPriority() {
    return 990;
  }
}

hookHandlers.addHook(new TestHook());
