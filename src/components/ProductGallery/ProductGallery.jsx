import { useState } from 'react';
import { Link } from 'react-router-dom';
import cricketShirtImg    from '../../assets/cricket-shirt-front.png';
import cricketTrousersImg from '../../assets/cricket-trousers-front.png';
import cricketSweaterImg  from '../../assets/cricket-sweater-front.png';
import footballJerseyImg  from '../../assets/football-jersey-front.png';
import footballShortsImg  from '../../assets/football-shorts-front.png';
import goalkeeperKitImg   from '../../assets/goalkeeperkit-front.png';
import basketballJerseyImg from '../../assets/basketball-jersey-front.png';
import basketballShortsImg from '../../assets/basketball-shorts-front.png';
import trainingTShirtImg  from '../../assets/training-T-shit-front.png';
import trackJacketImg     from '../../assets/tracksuit-front.png';
import trainingShortsImg  from '../../assets/training-shorts-front.png';
import trainingVestImg    from '../../assets/training-vest-front.png';

const PRODUCTS = [
  { id: 1,  image: cricketShirtImg,     name: 'Cricket Shirt',      cat: 'cricket',    color: '#1a3a1a' },
  { id: 2,  image: cricketTrousersImg,  name: 'Cricket Trousers',   cat: 'cricket',    color: '#7a5800' },
  { id: 3,  image: cricketSweaterImg,   name: 'Cricket Sweater',    cat: 'cricket',    color: '#4a0010' },
  { id: 4,  image: footballJerseyImg,   name: 'Football Jersey',    cat: 'football',   color: '#7a3a00' },
  { id: 5,  image: footballShortsImg,   name: 'Football Shorts',    cat: 'football',   color: '#0a1a3a' },
  { id: 6,  image: goalkeeperKitImg,    name: 'Goalkeeper Kit',     cat: 'football',   color: '#2a1a0a' },
  { id: 7,  image: basketballJerseyImg, name: 'Basketball Jersey',  cat: 'basketball', color: '#1a2a4a' },
  { id: 8,  image: basketballShortsImg, name: 'Basketball Shorts',  cat: 'basketball', color: '#1a3a1a' },
  { id: 9,  image: trainingTShirtImg,   name: 'Training T-Shirt',   cat: 'training',   color: '#4a0010' },
  { id: 10, image: trackJacketImg,      name: 'Track Jacket',       cat: 'training',   color: '#1a1a2a' },
  { id: 11, image: trainingShortsImg,   name: 'Training Shorts',    cat: 'training',   color: '#2a2a2a' },
  { id: 12, image: trainingVestImg,     name: 'Training Vest',      cat: 'training',   color: '#2a1a0a' },
];

const FILTERS = ['all', 'cricket', 'football', 'basketball', 'training', 'others'];

export default function ProductGallery() {
  const [active, setActive] = useState('all');

  const visible = active === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === active);

  return (
    <section className="bg-bg-800 py-24">
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
                className={`py-2 px-5 text-[11px] font-bold tracking-[1.5px] uppercase border-[1.5px] cursor-pointer rounded-[6px] transition-[all_200ms_ease] active:translate-y-0 hover:bg-bg-400 hover:text-light-100 hover:border-border-medium hover:-translate-y-px hover:shadow-[0_3px_8px_rgba(0,0,0,0.25)] ${isActive ? 'bg-red text-light-100 border-red shadow-[0_4px_12px_rgba(204,0,0,0.35)]' : 'bg-bg-600 text-light-500 border-border-dark'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-[900px] mx-auto">
          {visible.map((product) => (
            <Link
              key={product.id}
              to="/customize"
              className="group relative w-[130px] h-[130px] flex-shrink-0 bg-[var(--card-bg,var(--color-bg-600))] border border-border-dark aspect-[1] flex flex-col items-center justify-center overflow-hidden rounded-full no-underline transition-[transform_250ms_ease,box-shadow_250ms_ease] hover:scale-[1.08] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:z-[1] hover:bg-[#4a4a4a]!"
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

        <div className="flex items-center justify-center gap-4 mt-8 text-[12px] font-semibold tracking-[1px] uppercase text-light-600">
          <span>16 Unique Products</span>
          <span className="text-gold">•</span>
          <span>32 Total Images</span>
          <span className="text-gold">•</span>
          <span>4 Sports Categories</span>
        </div>
      </div>
    </section>
  );
}
