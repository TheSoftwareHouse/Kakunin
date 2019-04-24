export interface HookHandler {
  initializeHook(): void;
  getPriority(): number;
}
