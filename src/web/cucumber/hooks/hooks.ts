import * as hookHandler from './index';
import { HookHandler } from './hook.interface';

class HookHandlers {
  constructor(
    private availableHandlers: HookHandler[] = [
      hookHandler.takeScreenshotHook,
      hookHandler.reloadFixturesHook,
      hookHandler.clearDownloadHook,
      hookHandler.reloadUserHook,
      hookHandler.clearVariablesHook,
    ]
  ) {}

  public addHook(handler: HookHandler): void {
    this.availableHandlers.push(handler);
  }

  public initializeHook(): void {
    const handlers = this.getHooks();

    for (const handler of handlers) {
      handler.initializeHook();
    }
  }

  public getHooks(): HookHandler[] {
    return this.availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  }
}

export const hookHandlers = new HookHandlers();
