# prefer-abortsignal-in-fetch-like-apis

Encourage an `AbortSignal` option for recognized fetch-like calls.

## Why this matters

Adding an `AbortSignal` allows callers to cancel requests and clean up resources. This is important for preventing memory leaks and handling timeouts gracefully.

## Examples

❌ **Incorrect:**

```js
async function fetchUserData(userId) {
  // No AbortSignal; caller cannot cancel this request
  return fetch(`/api/users/${userId}`);
}
```

✅ **Better:**

```js
async function fetchUserData(userId, signal) {
  return fetch(`/api/users/${userId}`, { signal });
}
```

```js
// Usage with timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('/api/data', { signal: controller.signal });
  return response;
} finally {
  clearTimeout(timeoutId);
}
```

## Options

### `apis`

Array of API function names to check (default: `["fetch", "request"]`).

```json
{
  "rules": {
    "safe-async/prefer-abortsignal-in-fetch-like-apis": [
      "warn",
      {
        "apis": ["fetch", "request", "axios"]
      }
    ]
  }
}
```

## When not to use it

- For APIs that don't support cancellation.
- If your codebase doesn't require cancellation support.
