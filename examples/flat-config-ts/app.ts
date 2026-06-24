// TypeScript examples for safe-async rules

interface User {
  id: number;
  name: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

// ❌ no-floating-async-calls
async function fetchUsers(): Promise<User[]> {
  api.getUsers(); // Missing await
  return [];
}

// ✅ Correct
async function fetchUsersCorrect(): Promise<User[]> {
  return await api.getUsers();
}

// ❌ no-empty-catch-in-async with typed error
async function updateUserProfile(userId: number, name: string): Promise<void> {
  try {
    await api.updateUser(userId, { name });
  } catch (err: unknown) {
    // Silent failure
  }
}

// ✅ Correct: handle the error
async function updateUserProfileCorrect(userId: number, name: string): Promise<void> {
  try {
    await api.updateUser(userId, { name });
  } catch (err) {
    console.error('Failed to update profile:', err);
    throw err;
  }
}

// ❌ no-await-in-loop-when-batchable
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
  const users: User[] = [];
  for (const id of ids) {
    const user = await api.getUser(id); // Sequential!
    users.push(user);
  }
  return users;
}

// ✅ Correct: parallel requests
async function fetchMultipleUsersCorrect(ids: number[]): Promise<User[]> {
  const promises = ids.map(id => api.getUser(id));
  return Promise.all(promises);
}

// ❌ prefer-abortsignal-in-fetch-like-apis
async function fetchDataWithTimeout(url: string): Promise<Response> {
  return fetch(url); // Can't timeout or cancel
}

// ✅ Correct: add AbortSignal
async function fetchDataWithTimeoutCorrect(url: string, signal: AbortSignal): Promise<Response> {
  return fetch(url, { signal });
}

// Usage with timeout
async function fetchWithAbort(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}
