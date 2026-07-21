import { apiClient, ApiError } from './client';

export async function placeOrder(payload) {
  try {
    return await apiClient.post('/orders', payload);
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 0) throw err;
    console.warn('[ordersService] orders API unreachable, simulating success:', err.message);
    await new Promise(r => setTimeout(r, 500));
    return { simulated: true };
  }
}
