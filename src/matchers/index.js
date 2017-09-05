import { create as createMatchers } from './matchers';
import { regexBuilder as builder } from './matcher/regex-matcher/regex-builder';

export const matchers = createMatchers();
export const regexBuilder = builder;
