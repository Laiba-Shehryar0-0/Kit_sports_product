import { apiClient, ApiError } from './client';
import { KITS_SEED } from '../data/kitsSeed';
import { GALLERY_PRODUCTS_SEED } from '../data/galleryProductsSeed';
import { FEATURED_KITS_SEED } from '../data/featuredKitsSeed';

/** status 0 = fetch never reached a server (no backend running/configured); real error responses (4xx/5xx) are surfaced as-is. */
async function withFallback(fetchFn, seed, label) {
  try {
    return await fetchFn();
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 0) throw err;
    console.warn(`[productsService] ${label} unreachable, using local seed data:`, err.message);
    return seed;
  }
}

export function fetchKits() {
  return withFallback(() => apiClient.get('/kits'), KITS_SEED, 'kits API');
}

export function fetchGalleryProducts() {
  return withFallback(() => apiClient.get('/products'), GALLERY_PRODUCTS_SEED, 'gallery products API');
}

export function fetchFeaturedKits() {
  return withFallback(() => apiClient.get('/kits/featured'), FEATURED_KITS_SEED, 'featured kits API');
}
