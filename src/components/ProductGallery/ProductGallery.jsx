import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGalleryProducts } from '../../hooks/useProducts';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';

const FILTERS = ['all', 'cricket', 'football', 'basketball', 'training', 'others'];

export default function ProductGallery() {
  const [active, setActive] = useState('all');
  const { data: products, loading, error, reload } = useGalleryProducts();

  const visible = active === 'all'
    ? (products || [])
    : (products || []).filter(p => p.cat === active);

  return (
    <section className="bg-surface-800 py-24">
      <div className="container">
        <div className="flex flex-col items-start text-left gap-4 mb-10">
          <span className="section-label">Full Collection</span>
          <h2 className="section-title">Complete Product Gallery</h2>
          <p className="section-subtitle">
            Explore our full collection of premium sports kits and team uniforms
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {FILTERS.map(f => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`py-2 px-5 text-[11px] font-bold tracking-[1.5px] uppercase border-[1.5px] cursor-pointer rounded-[6px] transition-[all_200ms_ease] active:translate-y-0 hover:bg-surface-400 hover:text-light-100 hover:border-line-strong hover:-translate-y-px hover:shadow-[0_3px_8px_rgba(0,0,0,0.25)] ${isActive ? 'bg-red text-light-100 border-red shadow-[0_4px_12px_rgba(204,0,0,0.35)]' : 'bg-surface-600 text-onsurface-500 border-line'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            );
          })}
        </div>

        {loading && <LoadingState label="Loading products…" />}
        {error && !loading && <ErrorState message="Couldn't load products." onRetry={reload} />}

        {!loading && !error && (
          <>
            <div className="flex flex-wrap justify-center gap-6 max-w-[900px] mx-auto">
              {visible.map((product) => (
                <Link
                  key={product.id}
                  to="/customize"
                  className="group relative w-[130px] h-[130px] flex-shrink-0 bg-[var(--card-bg,var(--color-surface-600))] border border-line aspect-[1] flex flex-col items-center justify-center overflow-hidden rounded-full no-underline transition-[transform_250ms_ease,box-shadow_250ms_ease] hover:scale-[1.08] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:z-[1] hover:bg-[#4a4a4a]!"
                  style={{ '--card-bg': product.color }}
                >
                  <div className="w-[60px] h-[60px] flex items-center justify-center bg-transparent rounded-none">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-contain invert mix-blend-screen" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)] text-light-300 text-[9px] font-bold tracking-[0.5px] text-center py-1 px-2 uppercase translate-y-full transition-[transform_150ms_ease] group-hover:translate-y-0">{product.name}</div>
                  <div className="absolute inset-0 bg-[rgba(70,70,70,0.88)] flex items-center justify-center opacity-0 transition-[opacity_250ms_ease] group-hover:opacity-100">
                    <span className="text-[11px] font-bold tracking-[1px] uppercase text-light-100">Customize →</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-8 text-[12px] font-semibold tracking-[1px] uppercase text-onsurface-600">
              <span>16 Unique Products</span>
              <span className="text-gold">•</span>
              <span>32 Total Images</span>
              <span className="text-gold">•</span>
              <span>4 Sports Categories</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
