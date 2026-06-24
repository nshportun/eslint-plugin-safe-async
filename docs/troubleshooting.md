# Troubleshooting

## Rules are not running

**Problem:** I configured the plugin but rules are not being checked.

**Solution:**

1. Verify ESLint is using flat config (check for `eslint.config.js`/`eslint.config.mjs` in your project root)
2. Ensure the plugin is imported and configured in your flat config:
   ```js
   import safeAsync from 'eslint-plugin-safe-async';
   export default [
     {
       plugins: { 'safe-async': safeAsync },
       rules: { 'safe-async/no-floating-async-calls': 'error' },
     },
   ];
   ```
3. Check that your config includes the files you're linting:
   ```js
   {
     files: ['src/**/*.js'], // Make sure this matches your files
     plugins: { 'safe-async': safeAsync },
     // ...
   }
   ```

## False positives: "Rule is flagging correct code"

Every rule includes options to suppress warnings for legitimate patterns.

**Example:** `no-floating-async-calls` with intentional fire-and-forget:

```js
// Mark explicitly:
void backgroundJob();

// Or configure ignoreNames:
{
  rules: {
    'safe-async/no-floating-async-calls': [
      'error',
      { ignoreNames: ['queueJob'] },
    ],
  },
}
```

See each rule's documentation for available options.

## TypeScript setup

**Problem:** Rules aren't checking TypeScript files.

**Solution:** Configure ESLint to use `@typescript-eslint/parser`:

```js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import safeAsync from 'eslint-plugin-safe-async';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'safe-async': safeAsync,
    },
    rules: {
      'safe-async/no-floating-async-calls': 'error',
    },
  },
];
```

## "Parser error" or "Unexpected token"

**Problem:** ESLint can't parse TypeScript or JSX.

**Solution:** Make sure you have the TypeScript parser configured (see above).

## Performance issues

**Problem:** Linting is slow.

**Solution:**

1. Reduce the scope of your file matching in `eslint.config.js`
2. Check if you're running other heavy linting rules in parallel
3. Run `npx eslint --debug` to profile which rules are slow

The `safe-async` rules are lightweight and shouldn't impact performance significantly.

## Update or migrate

See [migration.md](migration.md) for guidance on moving from other async linting tools.

## Still stuck?

Open an issue on GitHub with:
- Your ESLint and Node.js versions
- Your ESLint configuration
- The code that's causing the problem
- The exact error message or unexpected behavior
