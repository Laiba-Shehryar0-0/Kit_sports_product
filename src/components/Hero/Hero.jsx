import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="hero__bg-glow hero__bg-glow--gold" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__headline">
            <span className="hero__headline-line1">PLAY WITH</span>
            <span className="hero__headline-line2">PASSION</span>
          </h1>

          <p className="hero__description">
            Based in Islamabad. High-grade fabrics, professional custom printing, and fast delivery. Get your team ready for game day.
          </p>

          <div className="hero__actions">
            <Link to="/kits" className="btn btn-red">
              Shop Kits
            </Link>
            <Link to="/customize" className="btn btn-outline">
              Get a Quote
            </Link>
          </div>

        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

