declare let browser: any;
declare let by: any;
declare let protractor: any;

declare module NodeJS {
  interface Global {
    by: any;
    expect(value: any): any;
  }
}

interface Console {
  err: any;
}

declare interface RegExpConstructor {
  escape(text: string): any;
}
