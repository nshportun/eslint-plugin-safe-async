import safeAsync from '@nshportun/eslint-plugin-safe-async';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['node_modules', 'dist', '**/*.d.ts'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
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
