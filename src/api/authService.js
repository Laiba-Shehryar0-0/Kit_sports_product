import { apiClient, ApiError } from './client';
import { setToken, clearToken } from './token';

/** status 0 = fetch never reached a server (no backend running/configured); anything else is a real response to trust as-is. */
function isUnreachable(err) {
  return err instanceof ApiError && err.status === 0;
}

const USERS_KEY = 'kws_users';

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** No backend reachable: reproduce sign-in/up locally, but hash passwords instead of storing plaintext. */
async function mockLogin(email, password) {
  const passwordHash = await hashPassword(password);
  const found = readUsers().find(u => u.email === email && u.passwordHash === passwordHash);
  if (!found) throw new Error('Invalid email or password.');
  const { passwordHash: _, ...user } = found;
  return { user, token: crypto.randomUUID() };
}

async function mockRegister(name, email, password) {
  const users = readUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('An account with this email already exists.');
  }
  const passwordHash = await hashPassword(password);
  const newUser = { id: Date.now(), name, email, passwordHash, avatar: name.charAt(0).toUpperCase() };
  writeUsers([...users, newUser]);
  const { passwordHash: _, ...user } = newUser;
  return { user, token: crypto.randomUUID() };
}

export async function login(email, password) {
  let result;
  try {
    result = await apiClient.post('/auth/login', { email, password });
  } catch (err) {
    if (!isUnreachable(err)) throw new Error(err.message || 'Invalid email or password.');
    console.warn('[authService] login API unreachable, using local fallback:', err.message);
    result = await mockLogin(email, password);
  }
  setToken(result.token);
  return result.user;
}

export async function register(name, email, password) {
  let result;
  try {
    result = await apiClient.post('/auth/register', { name, email, password });
  } catch (err) {
    if (!isUnreachable(err)) throw new Error(err.message || 'Could not create account.');
    console.warn('[authService] register API unreachable, using local fallback:', err.message);
    result = await mockRegister(name, email, password);
  }
  setToken(result.token);
  return result.user;
}

export function logout() {
  clearToken();
}
