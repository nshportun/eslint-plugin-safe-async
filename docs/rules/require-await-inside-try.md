# require-await-inside-try

Encourage local error handling for awaited operations.

## Why this matters

Awaited operations should have local error handling when they can fail. This rule nudges you to wrap awaited calls in a try/catch to ensure errors are handled locally rather than propagating up.

## Examples

⚠️ **Warning (but not an error):**

```js
async function fetchUsers() {
  // No try/catch around this critical operation
  const users = await api.get('/users');
  return users;
}
```

✅ **Better:**

```js
async function fetchUsers() {
  try {
    const users = await api.get('/users');
    return users;
  } catch (err) {
    logger.error('Failed to fetch users:', err);
    throw err;
  }
}
```

## Options

### `ignoredFunctionNames`

Function names whose awaited calls should not trigger this rule.

```json
{
  "rules": {
    "safe-async/require-await-inside-try": [
      "warn",
      {
        "ignoredFunctionNames": ["wait", "delay"]
      }
    ]
  }
}
```

## When not to use it

- If you handle errors at a higher level (middleware, global error handler), you may want to disable this rule.
- This is a suggestion rule by default; consider it a hint rather than an error.
