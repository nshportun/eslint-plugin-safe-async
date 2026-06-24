import type { ESLint } from 'eslint';
import { noFloatingAsyncCalls } from './rules/no-floating-async-calls';
import { noAwaitInLoopWhenBatchable } from './rules/no-await-in-loop-when-batchable';
import { noEmptyCatchInAsync } from './rules/no-empty-catch-in-async';
import { requireAwaitInsideTry } from './rules/require-await-inside-try';
import { preferAbortsignalInFetchLikeApis } from './rules/prefer-abortsignal-in-fetch-like-apis';
import { recommended } from './configs/recommended';
import { strict } from './configs/strict';

const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-safe-async',
    version: '0.0.1-development',
  },
  rules: {
    'no-floating-async-calls': noFloatingAsyncCalls as any,
    'no-await-in-loop-when-batchable': noAwaitInLoopWhenBatchable as any,
    'no-empty-catch-in-async': noEmptyCatchInAsync as any,
    'require-await-inside-try': requireAwaitInsideTry as any,
    'prefer-abortsignal-in-fetch-like-apis': preferAbortsignalInFetchLikeApis as any,
  },
  configs: {
    recommended: recommended as any,
    strict: strict as any,
  },
};

export default plugin;
export const rules: any = plugin.rules;
export const configs: any = plugin.configs;
