import { Link } from 'react-router-dom';
import useInView from '../../hooks/useInView';
import './HowItWorks.css';

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
    <section className="how">
      <div className="container">
        <div className={`how__header anim-fade-up${headerVisible ? ' is-visible' : ''}`} ref={headerRef}>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to your perfect team kit</p>
        </div>

        <div className="how__steps" ref={stepsRef}>
          {STEPS.map(({ num, title, desc, to }, index) => (
            <div key={num} className={`how__step anim-fade-up delay-${index + 1}${stepsVisible ? ' is-visible' : ''}`}>
              <Link to={to} className="how__step-circle">
                <span className="how__step-num">{num}</span>
              </Link>
              <h3 className="how__step-title">{title}</h3>
              <p className="how__step-desc">{desc}</p>
              {index < STEPS.length - 1 && (
                <div className="how__connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className={`how__cta anim-fade-up delay-2${ctaVisible ? ' is-visible' : ''}`} ref={ctaRef}>
          <Link to="/customize" className="btn btn-gold">
            Start Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
