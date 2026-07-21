import useInView from '../../hooks/useInView';

const STATS = [
  { value: '500+', label: 'Teams Outfitted' },
  { value: '16',   label: 'Unique Products' },
  { value: '4',    label: 'Sports Categories' },
  { value: '7',    label: 'Day Delivery' },
];

export default function Stats() {
  const [ref, visible] = useInView();
  return (
    <section
      className="bg-[linear-gradient(135deg,var(--color-bg-800)_0%,#1a0a0a_50%,var(--color-bg-800)_100%)] py-12 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent,transparent_120px,rgba(204,0,0,0.03)_120px,rgba(204,0,0,0.03)_121px)] before:pointer-events-none"
      ref={ref}
    >
      <div className="container grid grid-cols-4 gap-4 relative z-[1] max-[640px]:grid-cols-2">
        {STATS.map(({ value, label, icon }, i) => (
          <div
            key={label}
            className={`group flex flex-col items-center gap-2 py-8 px-4 rounded-[16px] bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] border border-[rgba(255,255,255,0.06)] relative overflow-hidden cursor-default transition-[transform_0.3s_ease,border-color_0.3s_ease,background_0.3s_ease] hover:-translate-y-1.5 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent,var(--color-red),var(--color-gold),transparent)] before:opacity-0 before:transition-[opacity_0.3s_ease] anim-fade-up delay-${i + 1}${visible ? ' is-visible' : ''}`}
            style={{ '--i': i }}
          >
            <span className="[font-family:'Bebas_Neue',var(--font-display)] text-[clamp(2.2rem,3.6vw,3.2rem)] tracking-[3px] leading-none text-light-100 transition-[transform_0.3s_ease] group-hover:scale-[1.08]">{value}</span>
            <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-[rgba(255,255,255,0.45)] text-center">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
