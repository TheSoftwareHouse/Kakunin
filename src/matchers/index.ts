import { regexBuilder as builder } from './matcher/regex-matcher/regex-builder';
import { create as createMatchers } from './matchers';

export const matchers = createMatchers();
export const regexBuilder = builder;
