import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SportsCategories.css';

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
    <section className="categories">
      <div className="container">
        <div className="categories__header">
          <h2 className="section-title section-title--dark">Sports Categories</h2>
        </div>

        <div className="categories__tabs" role="tablist">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              className={`categories__tab${active === id ? ' categories__tab--active' : ''}`}
              onClick={() => setActive(id)}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="categories__panel" role="tabpanel">
          {CATEGORY_KITS[active].map((name) => (
            <Link key={name} to="/kits" className="categories__kit-item">
              <span>{name}</span>
              <span className="categories__arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
