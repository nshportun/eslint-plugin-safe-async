# Migration Guide

## From `eslint-plugin-promise`

If you're using `eslint-plugin-promise`, here's how to migrate:

### Rules mapping

| `eslint-plugin-promise` | `@nshportun/eslint-plugin-safe-async` | Notes |
|---|---|---|
| `no-floating-promises` | `no-floating-async-calls` | Similar, but narrower scope and fewer false positives |
| `no-nesting-promise` | — | Out of scope; use single async functions instead |
| `catch-or-return` | — | Too noisy; use `require-await-inside-try` as a guide instead |
| `prefer-await-to-then` | — | Not needed; use async/await syntax directly |

### Step-by-step

1. **Install `safe-async` and remove `promise`:**
   ```bash
   npm install --save-dev @nshportun/eslint-plugin-safe-async
   npm uninstall eslint-plugin-promise
   ```

2. **Update your ESLint config:**
   ```js
   // Before (flat config)
   import promise from 'eslint-plugin-promise';
   export default [
     {
       plugins: { promise },
       rules: {
         'promise/no-floating-promises': 'error',
       },
     },
   ];

   // After
   import safeAsync from '@nshportun/eslint-plugin-safe-async';
   export default [
     {
       plugins: { 'safe-async': safeAsync },
       rules: {
         'safe-async/no-floating-async-calls': 'error',
       },
     },
   ];
   ```

3. **Review and silence existing violations:**
   - Use `void` or configure `ignoreNames` as described in the rule docs
   - Suppress false positives on a case-by-case basis

## From broad async linting

If you've been using general linting plugins with async rules, adopt `safe-async` for better signal-to-noise:

1. Install: `npm install --save-dev @nshportun/eslint-plugin-safe-async`
2. Use the `recommended` config: `import safeAsync from '@nshportun/eslint-plugin-safe-async'; export default [safeAsync.configs.recommended];`
3. Gradually enable stricter rules if needed

## Philosophy difference

`safe-async` is intentionally **narrower** than broad promise linters:

- We catch real bugs, not style preferences
- False positives are worse than false negatives (too noisy = ignored by the team)
- Options exist to handle legitimate patterns without disabling rules

This focus means higher adoption rates and better long-term maintainability.
