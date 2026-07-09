import useInView from '../../hooks/useInView';
import './Stats.css';

const STATS = [
  { value: '500+', label: 'Teams Outfitted' },
  { value: '16',   label: 'Unique Products' },
  { value: '4',    label: 'Sports Categories' },
  { value: '7',    label: 'Day Delivery' },
];

export default function Stats() {
  const [ref, visible] = useInView();
  return (
    <section className="stats" ref={ref}>
      <div className="container stats__grid">
        {STATS.map(({ value, label, icon }, i) => (
          <div
            key={label}
            className={`stats__item anim-fade-up delay-${i + 1}${visible ? ' is-visible' : ''}`}
            style={{ '--i': i }}
          >
            <span className="stats__value">{value}</span>
            <span className="stats__label">{label}</span>
            <div className="stats__bar" />
          </div>
        ))}
      </div>
    </section>
  );
}
