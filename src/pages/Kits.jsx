import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cricketShirtImg from '../assets/cricket-shirt.png';
import cricketTrousersImg from '../assets/cricket-trousers-front.png';
import cricketSweaterImg from '../assets/cricket-sweater.png';
import footballJerseyImg from '../assets/football-jersey.png';
import footballShortsImg from '../assets/football-shorts-front.png';
import goalkeeperKitImg from '../assets/goalkeeperkit-front.png';
import basketballJerseyImg from '../assets/basketball-jersey-front.png';
import basketballShortsImg from '../assets/basketball-shorts-front.png';
import trainingTShirtImg from '../assets/training-T-shit.png';
import trainingShortsImg from '../assets/training-shorts-front.png';
import trainingVestImg from '../assets/training-vest-front.png';
import cricketCapImg from '../assets/cricket-cap.png';
import basketballShoesImg from '../assets/basketball-shoes.png';
import trainingBibImg from '../assets/training-bib-front.png';
import warmupSuitImg from '../assets/warmup-suit-front.png';
import tracksuitImg from '../assets/tracksuit-front.png';
import boxingKitImg from '../assets/boxing-kit.png';
import hockeyKitImg from '../assets/hockey-kit.png';
import cyclingKitImg from '../assets/cycling-kit-front.png';
import rugbyKitImg from '../assets/rugby-kit-front.png';
import './Kits.css';

const ALL_KITS = [
  { id: 1,  slug: 'cricket-shirt',    emoji: '🏏', image: cricketShirtImg, name: 'Cricket Shirt',       sport: 'cricket',    desc: 'Premium cotton-poly blend cricket shirt with classic fit.', color: '#1a3a1a' },
  { id: 2,  slug: 'cricket-trousers', emoji: '🏏', image: cricketTrousersImg, name: 'Cricket Trousers',    sport: 'cricket',    desc: 'Full-length cricket trousers with reinforced knees.', color: '#7a5800' },
  { id: 3,  slug: 'cricket-sweater',  emoji: '🏏', image: cricketSweaterImg, name: 'Cricket Sweater',     sport: 'cricket',    desc: 'V-neck wool cricket sweater with team colors.', color: '#4a0010' },
  { id: 4,  slug: 'football-jersey',  emoji: '⚽', image: footballJerseyImg, name: 'Football Jersey',     sport: 'football',   desc: 'Lightweight moisture-wicking football jersey.', color: '#7a3a00' },
  { id: 5,  slug: 'football-shorts',  emoji: '⚽', image: footballShortsImg, name: 'Football Shorts',     sport: 'football',   desc: 'Elasticated football shorts with side pockets.', color: '#0a1a3a' },
  { id: 6,  slug: 'goalkeeper-kit',   emoji: '⚽', image: goalkeeperKitImg, name: 'Goalkeeper Kit',      sport: 'football',   desc: 'High-visibility goalkeeper jersey and shorts set.', color: '#2a1a0a' },
  { id: 7,  slug: 'basketball-jersey', emoji: '🏀', image: basketballJerseyImg, name: 'Basketball Jersey',   sport: 'basketball', desc: 'Mesh-panelled basketball jersey for maximum breathability.', color: '#0a1a3a' },
  { id: 8,  slug: 'basketball-shorts', emoji: '🏀', image: basketballShortsImg, name: 'Basketball Shorts',   sport: 'basketball', desc: 'Loose-fit basketball shorts with drawstring.', color: '#1a3a1a' },
  { id: 9,  slug: 'training-tshirt',  emoji: '💪', image: trainingTShirtImg, name: 'Training T-Shirt',    sport: 'training',   desc: 'Comfortable training tee in moisture-wicking fabric.', color: '#4a0010' },
  { id: 10, slug: 'basketball-shoes', emoji: '👟', image: basketballShoesImg, name: 'Basketball Shoes',   sport: 'basketball', desc: 'High-performance basketball shoes with ankle support.', color: '#4a0010' },
  { id: 11, slug: 'training-shorts',  emoji: '🩳', image: trainingShortsImg, name: 'Training Shorts',     sport: 'training',   desc: 'Lightweight training shorts with reflective trim.', color: '#2a2a2a' },
  { id: 12, slug: 'training-vest',    emoji: '🦺', image: trainingVestImg, name: 'Training Vest',       sport: 'training',   desc: 'Mesh training vest for team practice drills.', color: '#3a2a1a' },
  { id: 13, slug: 'cricket-cap',      emoji: '🧢', image: cricketCapImg, name: 'Cricket Cap',        sport: 'cricket',    desc: 'Classic cricket cap with adjustable fit.', color: '#1a3a1a' },
  { id: 14, slug: 'training-bib',     emoji: '🎽', image: trainingBibImg,    name: 'Training Bib',       sport: 'football',   desc: 'Lightweight mesh training bib for team drills.', color: '#0a1a3a' },
  { id: 15, slug: 'warmup-suit',      emoji: '🧥', image: warmupSuitImg,     name: 'Warm-up Suit',       sport: 'basketball', desc: 'Full-body warm-up suit for pre-game preparation.', color: '#7a3a00' },
  { id: 16, slug: 'tracksuit',        emoji: '👟', image: tracksuitImg,      name: 'Tracksuit',           sport: 'training',   desc: 'Comfortable full-body tracksuit for training sessions.', color: '#2a0a4a' },
  { id: 17, slug: 'boxing-kit',       emoji: '🥊', image: boxingKitImg,      name: 'Boxing Kit',          sport: 'others',     desc: 'Professional boxing shorts and vest set.', color: '#0a3a1a' },
  { id: 18, slug: 'hockey-kit',       emoji: '🏑', image: hockeyKitImg,      name: 'Hockey Kit',          sport: 'others',     desc: 'Durable hockey jersey and shorts for field play.', color: '#4a0010' },
  { id: 19, slug: 'cycling-kit',      emoji: '🚴', image: cyclingKitImg,     name: 'Cycling Kit',         sport: 'others',     desc: 'Aerodynamic cycling jersey and shorts.', color: '#0a1a3a' },
  { id: 20, slug: 'rugby-kit',        emoji: '🏉', image: rugbyKitImg,       name: 'Rugby Kit',           sport: 'others',     desc: 'Heavy-duty rugby jersey built for contact sport.', color: '#3a1a0a' },
];

const SPORTS = ['All', 'Cricket', 'Football', 'Basketball', 'Training', 'Others'];
const SPORT_ORDER = ['cricket', 'football', 'basketball', 'training', 'others'];

export default function Kits() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('sport') || 'all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const sport = searchParams.get('sport');
    if (sport) setFilter(sport);
  }, [searchParams]);

  const filtered = ALL_KITS.filter(k => {
    const matchSport = filter === 'all' || k.sport === filter;
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase());
    return matchSport && matchSearch;
  });

  const visible = filter === 'all'
    ? [...filtered].sort((a, b) => SPORT_ORDER.indexOf(a.sport) - SPORT_ORDER.indexOf(b.sport))
    : filtered;

  const firstOfSport = new Set();
  const visibleWithTag = visible.map(kit => {
    const showTag = !firstOfSport.has(kit.sport);
    if (showTag) firstOfSport.add(kit.sport);
    return { ...kit, showTag };
  });

  return (
    <div className="kits-page">
      <div className="kits-page__hero">
        <div className="container">
          <h1 className="section-title">Our Sports Kits</h1>
          <p className="section-subtitle">
            Premium quality kits for every sport. All customizable to your team's identity.
          </p>
        </div>
      </div>

      <div className="container kits-page__main">
        {/* Controls */}
        <div className="kits-page__controls">
          <div className="kits-page__filters">
            {SPORTS.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s.toLowerCase())}
                className={`kits-page__filter${filter === s.toLowerCase() ? ' kits-page__filter--active' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="kits-page__search"
            placeholder="Search kits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Count */}
        <p className="kits-page__count">
          Showing <strong>{visible.length}</strong> kit{visible.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="kits-page__grid">
          {visibleWithTag.map(kit => (
            <KitDetailCard key={kit.id} kit={kit} showTag={kit.showTag} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="kits-page__empty">
            <span>🔍</span>
            <p>No kits found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function KitDetailCard({ kit, showTag }) {
  return (
    <div className="kit-detail-card" style={{ '--kit-color': kit.color }}>
      <div className="kit-detail-card__image">
        {kit.image
          ? <img src={kit.image} alt={kit.name} className="kit-detail-card__img" />
          : <span className="kit-detail-card__emoji">{kit.emoji}</span>
        }
        {showTag && <span className="kit-detail-card__sport">{kit.sport}</span>}
      </div>
      <div className="kit-detail-card__body">
        <h3 className="kit-detail-card__name">{kit.name}</h3>
        <p className="kit-detail-card__desc">{kit.desc}</p>
        <div className="kit-detail-card__actions">
          <Link to={`/customize?kit=${kit.slug}`} className="btn btn-red kit-detail-card__btn">
            Customize
          </Link>
          <Link to="/#contact" className="btn kit-detail-card__btn kit-detail-card__btn--quote">
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
