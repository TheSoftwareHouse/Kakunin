import { Before } from 'cucumber';

class TestHook {
  public handleHook() {
    Before(() => {
      console.log('Standard hook');
    });
  }

  public getPriority() {
    return 990;
  }
}

export const testHook = new TestHook();
