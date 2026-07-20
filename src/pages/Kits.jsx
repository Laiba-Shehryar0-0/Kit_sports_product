import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cricketShirtImg from '../assets/cricket-shirt-front.png';
import cricketTrousersImg from '../assets/cricket-trousers-front.png';
import cricketSweaterImg from '../assets/cricket-sweater-front.png';
import footballJerseyImg from '../assets/football-jersey-front.png';
import footballShortsImg from '../assets/football-shorts-front.png';
import goalkeeperKitImg from '../assets/goalkeeperkit-front.png';
import basketballJerseyImg from '../assets/basketball-jersey-front.png';
import basketballShortsImg from '../assets/basketball-shorts-front.png';
import trainingTShirtImg from '../assets/training-T-shit-front.png';
import trainingShortsImg from '../assets/training-shorts-front.png';
import trainingVestImg from '../assets/training-vest-front.png';
import cricketCapImg from '../assets/cricket-cap.png';
import basketballHeadbandImg from '../assets/basketball-headband.png';
import trainingBibImg from '../assets/training-bib-front.png';
import warmupSuitImg from '../assets/warmup-suit-front.png';
import tracksuitImg from '../assets/tracksuit-front.png';
import boxingKitImg from '../assets/boxing-kit.png';
import hockeyKitImg from '../assets/hockey-kit-front.png';
import cyclingKitImg from '../assets/cycling-kit-front.png';
import rugbyKitImg from '../assets/rugby-kit-front.png';

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
  { id: 10, slug: 'basketball-headband', emoji: '🎗️', image: basketballHeadbandImg, name: 'Basketball Headband',   sport: 'basketball', desc: 'Sweat-wicking headband to keep you focused on the game.', color: '#4a0010' },
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

  return (
    <div className="min-h-screen bg-bg-800 pt-[72px]">
      <div className="bg-bg-900 pt-16 pb-12 border-b border-border-dark">
        <div className="container flex flex-col items-start gap-4">
          <h1 className="section-title">Our Sports Kits</h1>
          <p className="section-subtitle whitespace-nowrap">
            Premium quality kits for every sport. All customizable to your team's identity.
          </p>
        </div>
      </div>

      <div className="container pt-10 pb-16">
        {/* Controls */}
        <div className="flex items-center justify-between gap-5 mb-5 flex-wrap max-[768px]:flex-col max-[768px]:items-start">
          <div className="flex gap-2 flex-wrap">
            {SPORTS.map(s => {
              const isActive = filter === s.toLowerCase();
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s.toLowerCase())}
                  className={`py-2 px-5 text-[11px] font-bold tracking-[1.5px] uppercase border-[1.5px] cursor-pointer rounded-[6px] transition-[all_200ms_ease] active:translate-y-0 hover:text-light-100 hover:border-light-400 hover:bg-bg-500 hover:-translate-y-px hover:shadow-[0_3px_8px_rgba(0,0,0,0.25)] ${isActive ? 'bg-red text-light-100 border-red shadow-[0_4px_12px_rgba(204,0,0,0.35)]' : 'bg-bg-600 text-light-500 border-border-dark'}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <input
            type="search"
            className="py-[10px] px-5 bg-bg-600 border border-border-dark text-light-100 text-[0.875rem] w-[260px] outline-none transition-[border-color_150ms_ease] rounded-none placeholder:text-light-600 focus:border-red max-[768px]:w-full"
            placeholder="Search kits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Count */}
        <p className="text-[0.875rem] text-light-600 mb-8">
          Showing <strong className="text-light-300">{visible.length}</strong> kit{visible.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
          {visible.map(kit => (
            <KitDetailCard key={kit.id} kit={kit} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <span className="text-[3rem]">🔍</span>
            <p className="text-light-500 text-base">No kits found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function KitDetailCard({ kit }) {
  return (
    <div
      className="bg-bg-600 border border-border-dark rounded-[12px] overflow-hidden transition-[transform_250ms_ease,box-shadow_250ms_ease,border-color_250ms_ease] hover:-translate-y-[5px] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-border-medium"
      style={{ '--kit-color': kit.color }}
    >
      <div className="relative aspect-[1.2] bg-bg-700 flex items-center justify-center">
        {kit.image
          ? <img src={kit.image} alt={kit.name} className="w-[175px] h-[175px] object-contain" />
          : <span className="text-[3.5rem] [filter:drop-shadow(0_4px_12px_rgba(0,0,0,0.4))]">{kit.emoji}</span>
        }
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-[15px] font-bold text-light-100">{kit.name}</h3>
        <p className="text-[0.8rem] text-light-500 leading-[1.65]">{kit.desc}</p>
        <div className="flex gap-2 flex-wrap mt-2">
          <Link to={`/customize?kit=${kit.slug}`} className="btn btn-red py-2 px-4 text-[10px] flex-1 justify-center">
            Customize
          </Link>
          <Link
            to="/#contact"
            className="btn py-2 px-4 text-[10px] flex-1 justify-center bg-transparent border-[1.5px] border-light-600 text-light-100 hover:border-[#bbbbbb] hover:bg-[rgba(255,255,255,0.06)]"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
