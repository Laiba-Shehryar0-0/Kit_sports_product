import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useKits } from '../hooks/useProducts';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';

const SPORTS = ['All', 'Cricket', 'Football', 'Basketball', 'Training', 'Others'];
const SPORT_ORDER = ['cricket', 'football', 'basketball', 'training', 'others'];

export default function Kits() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('sport') || 'all');
  const [search, setSearch] = useState('');
  const { data: allKits, loading, error, reload } = useKits();

  useEffect(() => {
    const sport = searchParams.get('sport');
    if (sport) setFilter(sport);
  }, [searchParams]);

  const filtered = (allKits || []).filter(k => {
    const matchSport = filter === 'all' || k.sport === filter;
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase());
    return matchSport && matchSearch;
  });

  const visible = filter === 'all'
    ? [...filtered].sort((a, b) => SPORT_ORDER.indexOf(a.sport) - SPORT_ORDER.indexOf(b.sport))
    : filtered;

  return (
    <div className="min-h-screen bg-surface-800 pt-[72px]">
      <div className="bg-surface-900 pt-16 pb-12 border-b border-line">
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
                  className={`py-2 px-5 text-[11px] font-bold tracking-[1.5px] uppercase border-[1.5px] cursor-pointer rounded-[6px] transition-[all_200ms_ease] active:translate-y-0 hover:text-onsurface-100 hover:border-onsurface-400 hover:bg-surface-500 hover:-translate-y-px hover:shadow-[0_3px_8px_rgba(0,0,0,0.25)] ${isActive ? 'bg-red text-light-100 border-red shadow-[0_4px_12px_rgba(204,0,0,0.35)]' : 'bg-surface-600 text-onsurface-500 border-line'}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <input
            type="search"
            className="py-[10px] px-5 bg-surface-600 border border-line text-onsurface-100 text-[0.875rem] w-[260px] outline-none transition-[border-color_150ms_ease] rounded-none placeholder:text-onsurface-600 max-[768px]:w-full"
            placeholder="Search kits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading && <LoadingState label="Loading kits…" />}
        {error && !loading && <ErrorState message="Couldn't load kits." onRetry={reload} />}

        {!loading && !error && (
          <>
            {/* Count */}
            <p className="text-[0.875rem] text-onsurface-600 mb-8">
              Showing <strong className="text-onsurface-300">{visible.length}</strong> kit{visible.length !== 1 ? 's' : ''}
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
                <p className="text-onsurface-500 text-base">No kits found. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function KitDetailCard({ kit }) {
  return (
    <div
      className="bg-surface-600 border border-line rounded-[12px] overflow-hidden transition-[transform_250ms_ease,box-shadow_250ms_ease,border-color_250ms_ease] hover:-translate-y-[5px] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-line-strong"
      style={{ '--kit-color': kit.color }}
    >
      <div className="relative aspect-[1.2] bg-surface-700 flex items-center justify-center">
        {kit.image
          ? <img src={kit.image} alt={kit.name} className="w-[175px] h-[175px] object-contain" />
          : <span className="text-[3.5rem] [filter:drop-shadow(0_4px_12px_rgba(0,0,0,0.4))]">{kit.emoji}</span>
        }
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-[15px] font-bold text-onsurface-100">{kit.name}</h3>
        <p className="text-[0.8rem] text-onsurface-500 leading-[1.65]">{kit.desc}</p>
        <div className="flex gap-2 flex-wrap mt-2">
          <Link to={`/customize?kit=${kit.slug}`} className="btn btn-red py-2 px-4 text-[10px] flex-1 justify-center">
            Customize
          </Link>
          <Link
            to="/#contact"
            className="btn py-2 px-4 text-[10px] flex-1 justify-center bg-transparent border-[1.5px] border-onsurface-600 text-onsurface-100 hover:border-[#bbbbbb] hover:bg-[rgba(255,255,255,0.06)]"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
