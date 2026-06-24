# no-empty-catch-in-async

Disallow empty catch blocks around async operations.

## Why this matters

Empty catch blocks swallow errors silently, making debugging difficult and hiding failures. Always handle, log, or explicitly mark ignored errors.

## Examples

❌ **Incorrect:**

```js
async function fetchData() {
  try {
    return await api.get('/data');
  } catch {
    // Bug is silently swallowed
  }
}
```

✅ **Correct:**

```js
async function fetchData() {
  try {
    return await api.get('/data');
  } catch (err) {
    logger.error('Failed to fetch data:', err);
    throw err;
  }
}
```

```js
// With explicit marker
async function fetchData() {
  try {
    return await api.get('/data');
  } catch {
    // intentionally ignored: not critical for this operation
  }
}
```

## Options

### `allowCommentMarker`

Allow empty catch blocks with a specific comment marker (default: `"intentionally ignored"`).

```json
{
  "rules": {
    "safe-async/no-empty-catch-in-async": [
      "error",
      {
        "allowCommentMarker": "swallow error"
      }
    ]
  }
}
```

## When not to use it

- If you use a linting comment like `// intentionally ignored`, this rule will not flag it.
