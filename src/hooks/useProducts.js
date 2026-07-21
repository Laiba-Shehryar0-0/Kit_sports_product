import useAsyncResource from './useAsyncResource';
import { fetchKits, fetchGalleryProducts, fetchFeaturedKits } from '../api/productsService';

export function useKits() {
  return useAsyncResource(fetchKits, []);
}

export function useGalleryProducts() {
  return useAsyncResource(fetchGalleryProducts, []);
}

export function useFeaturedKits() {
  return useAsyncResource(fetchFeaturedKits, []);
}
