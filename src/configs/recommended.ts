import type { Linter } from 'eslint';

export const recommended: Linter.Config = {
  plugins: {
    'safe-async': {} as any,
  },
  rules: {
    'safe-async/no-floating-async-calls': 'error',
    'safe-async/no-empty-catch-in-async': 'error',
  },
};
