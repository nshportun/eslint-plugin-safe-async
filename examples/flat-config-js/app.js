// Examples of safe-async rules in action

// ❌ no-floating-async-calls: forgotten await
async function fetchData() {
  api.getData(); // Missing await!
}

// ✅ Correct
async function fetchDataCorrect() {
  await api.getData();
}

// ❌ no-empty-catch-in-async: empty catch block
async function handleRequest() {
  try {
    await processRequest();
  } catch {
    // Errors are silently swallowed
  }
}

// ✅ Correct
async function handleRequestCorrect() {
  try {
    await processRequest();
  } catch (err) {
    console.error('Failed to process:', err);
  }
}

// ❌ no-await-in-loop-when-batchable: serial awaiting
async function processUsers(userIds) {
  const results = [];
  for (const id of userIds) {
    results.push(await fetchUser(id)); // Slow!
  }
  return results;
}

// ✅ Correct: use Promise.all
async function processUsersCorrect(userIds) {
  return Promise.all(userIds.map(id => fetchUser(id)));
}

// ❌ prefer-abortsignal-in-fetch-like-apis: no AbortSignal
async function getData() {
  return fetch('/api/data'); // Can't cancel!
}

// ✅ Correct
async function getDataCorrect(signal) {
  return fetch('/api/data', { signal });
}
