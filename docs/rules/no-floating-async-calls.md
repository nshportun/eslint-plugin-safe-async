# no-floating-async-calls

Detect async calls or promise-returning calls whose results are ignored.

## Why this matters

Forgetting to `await` or handle a promise is a common source of bugs in async code. When a function returns a promise and you call it without `await`, `.catch()`, `return`, or `void`, the promise executes in the background without error handling. Any rejection becomes an unhandled promise rejection, which can crash the process or go silently unnoticed depending on your Node.js or browser configuration.

## Examples

❌ **Incorrect:**

```js
async function processUsers() {
  const users = await fetchUsers();
  users.forEach(user => {
    updateCache(user); // Promise is ignored!
  });
}
```

```js
async function sendNotification() {
  sendEmail('user@example.com'); // Forgotten await
}
```

✅ **Correct:**

```js
async function processUsers() {
  const users = await fetchUsers();
  users.forEach(user => {
    await updateCache(user); // Properly awaited
  });
}
```

```js
async function sendNotification() {
  await sendEmail('user@example.com');
}
```

```js
// Explicitly ignore the promise
function startBackgroundJob() {
  void trackAnalytics(); // Intent is clear
}
```

```js
// Handle promise with .catch()
function startBackgroundJob() {
  trackAnalytics().catch(err => {
    console.error('Analytics failed:', err);
  });
}
```

## Options

### `ignoreNames`

Array of function names to ignore. Use this for intentional fire-and-forget patterns.

```json
{
  "rules": {
    "safe-async/no-floating-async-calls": [
      "error",
      {
        "ignoreNames": ["queueJob", "scheduleTask"]
      }
    ]
  }
}
```

### `ignoreWrappers`

Array of wrapper function names that safely handle promises (default: `["void"]`).

```json
{
  "rules": {
    "safe-async/no-floating-async-calls": [
      "error",
      {
        "ignoreWrappers": ["void", "safeIgnore"]
      }
    ]
  }
}
```

## Related rules

- `require-await-inside-try`: Encourage local error handling for critical awaited operations.

## When not to use it

- If you have intentional fire-and-forget patterns, configure `ignoreNames` or `ignoreWrappers` rather than disabling the rule.
- If you're using a custom promise queue or job scheduler, add it to `ignoreNames`.
