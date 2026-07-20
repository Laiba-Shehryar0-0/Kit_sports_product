import { Link } from 'react-router-dom';
import useInView from '../../hooks/useInView';

const STEPS = [
  { num: '1', title: 'Pick Your Kit',  desc: 'Choose from our wide range of sports kits and styles.', to: '/kits' },
  { num: '2', title: 'Customize',      desc: 'Add names, numbers, colors, and personal touches.',       to: '/customize' },
  { num: '3', title: 'Delivered',      desc: 'Fast delivery to your door with quality guarantee.',       to: '/checkout' },
];

export default function HowItWorks() {
  const [headerRef, headerVisible] = useInView();
  const [stepsRef, stepsVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();
  return (
    <section className="bg-bg-700 py-24">
      <div className="container">
        <div
          className={`text-center flex flex-col items-center gap-2 mb-16 anim-fade-up${headerVisible ? ' is-visible' : ''}`}
          ref={headerRef}
        >
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to your perfect team kit</p>
        </div>

        <div
          className="grid grid-cols-3 gap-8 relative max-w-[900px] mx-auto max-[768px]:grid-cols-1 max-[768px]:max-w-[400px]"
          ref={stepsRef}
        >
          {STEPS.map(({ num, title, desc, to }, index) => (
            <div key={num} className={`group flex flex-col items-center text-center relative anim-fade-up delay-${index + 1}${stepsVisible ? ' is-visible' : ''}`}>
              <Link
                to={to}
                className="w-[72px] h-[72px] rounded-full border-2 border-gold flex items-center justify-center mb-4 bg-bg-600 shadow-[0_0_0_4px_var(--gold-tint)] transition-[background_250ms_ease,box-shadow_250ms_ease,transform_250ms_ease,border-color_250ms_ease] cursor-pointer group-hover:bg-gold group-hover:shadow-[0_0_0_6px_rgba(245,166,35,0.25),0_8px_24px_rgba(245,166,35,0.35)] group-hover:-translate-y-1 group-hover:scale-[1.08]"
              >
                <span className="font-display text-[2rem] text-gold leading-none group-hover:text-black">{num}</span>
              </Link>
              <h3 className="text-[14px] font-bold tracking-[1px] uppercase text-light-100 mb-2">{title}</h3>
              <p className="text-[0.875rem] text-light-500 leading-[1.65] max-w-[220px]">{desc}</p>
              {index < STEPS.length - 1 && (
                <div
                  className="absolute top-[36px] left-[calc(50%+40px)] w-[calc(100%+32px-80px)] h-0.5 bg-[linear-gradient(to_right,var(--color-gold),var(--color-border-dark))] pointer-events-none max-[768px]:hidden"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 anim-fade-up delay-2${ctaVisible ? ' is-visible' : ''}`} ref={ctaRef}>
          <Link to="/customize" className="btn btn-gold">
            Start Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
