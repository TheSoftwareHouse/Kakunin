export interface FormHandler {
  type: string;

  isSatisfiedBy(element?: object, elementName?: string): Promise<boolean>;
  handleFill(page: object, elementName: string, desiredValue: string): Promise<string | void>;
  handleCheck(page: object, elementName: string, desiredValue: string): Promise<string | void>;
  getPriority(): number;
}
