# eslint-plugin-safe-async

Focused ESLint rules for catching real async/await bugs before they hit production.

## Quick start

### Install

```bash
npm install --save-dev eslint-plugin-safe-async
```

### Flat config

```js
// eslint.config.js
import safeAsync from 'eslint-plugin-safe-async';

export default [
  {
    plugins: {
      'safe-async': safeAsync,
    },
    rules: {
      'safe-async/no-floating-async-calls': 'error',
      'safe-async/no-empty-catch-in-async': 'error',
    },
  },
];
```

### Use recommended config

```js
// eslint.config.js
import safeAsync from 'eslint-plugin-safe-async';

export default [safeAsync.configs.recommended];
```

### TypeScript

```ts
// eslint.config.js
import safeAsync from 'eslint-plugin-safe-async';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'safe-async': safeAsync,
    },
    rules: {
      ...safeAsync.configs.recommended.rules,
    },
  },
];
```

## Rules

| Rule | Type | Recommended | Description |
|------|------|-------------|-------------|
| [no-floating-async-calls](docs/rules/no-floating-async-calls.md) | 🚨 Error | ✅ | Detect ignored async calls and promises |
| [no-await-in-loop-when-batchable](docs/rules/no-await-in-loop-when-batchable.md) | 💡 Suggestion | ❌ | Identify parallelization opportunities |
| [no-empty-catch-in-async](docs/rules/no-empty-catch-in-async.md) | 🚨 Error | ✅ | Disallow empty catch blocks |
| [require-await-inside-try](docs/rules/require-await-inside-try.md) | 💡 Suggestion | ❌ | Encourage local error handling |
| [prefer-abortsignal-in-fetch-like-apis](docs/rules/prefer-abortsignal-in-fetch-like-apis.md) | 💡 Suggestion | ❌ | Support request cancellation |

## Why these rules matter

Modern async/await code is easier to read than callback chains, but it introduces new classes of bugs:

- **Forgotten awaits** silently create background promises with no error handling.
- **Sequential awaiting in loops** wastes performance when parallelization is possible.
- **Empty catch blocks** hide errors and make debugging a nightmare.
- **Unhandled rejections** can crash your application or go silently unnoticed.

This plugin catches these bugs early with high-confidence rules, low false-positive rates, and clear error messages.

## Compatibility

- **Node.js:** `^20.0.0 || >=22.0.0`
- **ESLint:** `9.0.0` or later (flat config)
- **JavaScript/TypeScript:** Modern projects using ES2020+

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](SECURITY.md) for reporting security issues.

## License

MIT

## No telemetry

This plugin:
- Has **no telemetry** or tracking
- Makes **no network calls** at runtime
- Has **minimal dependencies** (only ESLint)
- Is **transparent and trustworthy** to publish
