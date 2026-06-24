import type { Linter } from 'eslint';

export const strict: Linter.Config = {
  plugins: {
    'safe-async': {} as any,
  },
  rules: {
    'safe-async/no-floating-async-calls': 'error',
    'safe-async/no-await-in-loop-when-batchable': 'warn',
    'safe-async/no-empty-catch-in-async': 'error',
    'safe-async/require-await-inside-try': 'warn',
    'safe-async/prefer-abortsignal-in-fetch-like-apis': 'warn',
  },
};
