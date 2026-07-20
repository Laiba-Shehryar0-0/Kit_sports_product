import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'cricket',    emoji: '🏏', label: 'Cricket' },
  { id: 'football',  emoji: '⚽', label: 'Football' },
  { id: 'basketball',emoji: '🏀', label: 'Basketball' },
  { id: 'training',  emoji: '💪', label: 'Training' },
  { id: 'others',    emoji: '🎯', label: 'Others' },
];

const CATEGORY_KITS = {
  cricket:    ['Cricket Shirt', 'Cricket Trousers', 'Cricket Sweater', 'Cricket Cap'],
  football:   ['Football Jersey', 'Football Shorts', 'Goalkeeper Kit', 'Training Bib'],
  basketball: ['Basketball Jersey', 'Basketball Shorts', 'Warm-up Suit', 'Training Vest'],
  training:   ['Training T-Shirt', 'Track Jacket', 'Training Shorts', 'Tracksuit'],
  others:     ['Boxing Kit', 'Hockey Kit', 'Cycling Kit', 'Rugby Kit'],
};

export default function SportsCategories() {
  const [active, setActive] = useState('basketball');

  return (
    <section className="bg-light-100 py-24">
      <div className="container">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="section-title section-title--dark">Sports Categories</h2>
        </div>

        <div
          className="flex items-center justify-center gap-2 overflow-auto w-fit mx-auto mb-10 p-2 bg-light-200 rounded-[10px] max-[900px]:flex-wrap max-[900px]:w-full"
          role="tablist"
        >
          {CATEGORIES.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                className={`flex items-center gap-2 py-[10px] px-6 text-[12px] font-bold tracking-[1.5px] uppercase border-none cursor-pointer rounded-[7px] transition-[all_200ms_ease] whitespace-nowrap active:translate-y-0 hover:-translate-y-px max-[900px]:flex-1 max-[900px]:min-w-[100px] ${isActive ? 'bg-red text-light-100 shadow-[0_4px_12px_rgba(204,0,0,0.35)] hover:bg-red-dark' : 'bg-transparent text-light-700 hover:bg-light-100 hover:text-bg-800 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]'}`}
                onClick={() => setActive(id)}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div
          className="grid grid-cols-4 gap-4 max-w-[900px] mx-auto max-[900px]:grid-cols-2 max-[480px]:grid-cols-1"
          role="tabpanel"
        >
          {CATEGORY_KITS[active].map((name) => (
            <Link
              key={name}
              to="/kits"
              className="group flex items-center gap-3 py-4 px-5 bg-light-200 border border-light-300 rounded-[10px] text-bg-700 text-[0.875rem] font-semibold transition-[all_150ms_ease] no-underline hover:bg-red hover:text-light-100 hover:border-red hover:translate-x-1"
            >
              <span>{name}</span>
              <span className="ml-auto opacity-50 transition-[opacity_150ms_ease,transform_150ms_ease] group-hover:opacity-100 group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
