import { useState } from 'react';
import { Link } from 'react-router-dom';
import cricketShirtImg    from '../../assets/cricket-shirt.png';
import cricketTrousersImg from '../../assets/cricket-trousers.png';
import cricketSweaterImg  from '../../assets/cricket-sweater.png';
import footballJerseyImg  from '../../assets/football-jersey.png';
import footballShortsImg  from '../../assets/football-shorts.png';
import goalkeeperKitImg   from '../../assets/goalkeeper-kit.png';
import basketballJerseyImg from '../../assets/Basketball-Jersey.png';
import basketballShortsImg from '../../assets/basketball-shorts.png';
import trainingTShirtImg  from '../../assets/training-T-shit.png';
import trackJacketImg     from '../../assets/Track-jacket.png';
import trainingShortsImg  from '../../assets/training-shorts.png';
import trainingVestImg    from '../../assets/Training Vest.png';
import './ProductGallery.css';

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
    <section className="gallery">
      <div className="container">
        <div className="gallery__header">
          <span className="section-label">Full Collection</span>
          <h2 className="section-title">Complete Product Gallery</h2>
          <p className="section-subtitle">
            Explore our full collection of premium sports kits and team uniforms
          </p>
        </div>

        <div className="gallery__filters">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`gallery__filter${active === f ? ' gallery__filter--active' : ''}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {visible.map((product) => (
            <Link key={product.id} to="/customize" className="gallery__card" style={{ '--card-bg': product.color }}>
              <div className="gallery__card-img">
                <img src={product.image} alt={product.name} className="gallery__card-png" />
              </div>
              <div className="gallery__card-label">{product.name}</div>
              <div className="gallery__card-hover">
                <span>Customize →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="gallery__meta">
          <span>16 Unique Products</span>
          <span className="gallery__meta-dot">•</span>
          <span>32 Total Images</span>
          <span className="gallery__meta-dot">•</span>
          <span>4 Sports Categories</span>
        </div>
      </div>
    </section>
  );
}
