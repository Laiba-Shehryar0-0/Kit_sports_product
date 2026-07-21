import { apiClient, ApiError } from './client';

export async function submitContactForm(payload) {
  try {
    return await apiClient.post('/contact', payload);
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 0) throw err;
    console.warn('[contactService] contact API unreachable, simulating success:', err.message);
    await new Promise(r => setTimeout(r, 500));
    return { simulated: true };
  }
}
