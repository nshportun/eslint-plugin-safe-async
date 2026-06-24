import safeAsync from 'eslint-plugin-safe-async';

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      'safe-async': safeAsync,
    },
    rules: {
      'safe-async/no-floating-async-calls': 'error',
      'safe-async/no-empty-catch-in-async': 'error',
      'safe-async/no-await-in-loop-when-batchable': 'warn',
      'safe-async/require-await-inside-try': 'warn',
      'safe-async/prefer-abortsignal-in-fetch-like-apis': 'warn',
    },
  },
];
