import { Before } from 'cucumber';
import { HookHandler } from '../hook-handler.interface';

class TestHook implements HookHandler {
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
