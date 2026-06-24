# no-await-in-loop-when-batchable

Detect serial awaits in loops when the pattern can likely be replaced by `Promise.all()`.

## Why this matters

Sequential awaiting in loops can be slow. When you can execute promises in parallel, using `Promise.all()` improves performance and reduces latency.

## Examples

❌ **Incorrect:**

```js
async function fetchAllUsers(ids) {
  const users = [];
  for (const id of ids) {
    const user = await fetchUser(id); // Slow: awaits sequentially
    users.push(user);
  }
  return users;
}
```

✅ **Correct:**

```js
async function fetchAllUsers(ids) {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises); // Fast: awaits in parallel
}
```

## Options

### `allowIntentionalSequencing`

Allow sequential awaiting if you need to process results in order or if each iteration depends on the previous one.

```json
{
  "rules": {
    "safe-async/no-await-in-loop-when-batchable": [
      "warn",
      {
        "allowIntentionalSequencing": true
      }
    ]
  }
}
```

## When not to use it

- If each loop iteration depends on the result of the previous iteration.
- If you need to process results one at a time for memory or ordering reasons.
