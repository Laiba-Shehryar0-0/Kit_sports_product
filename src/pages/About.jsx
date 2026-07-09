import { Link } from 'react-router-dom';
import './About.css';

const MILESTONES = [
  { year: '2025', event: 'Founded in Islamabad, Pakistan' },
  { year: '2025', event: 'Expanded to football and basketball kits' },
  { year: '2025', event: 'Online customization platform launched' },
  { year: '2026', event: 'Digital kit design tool launched' },
];

const VALUES = [
  { icon: '🏆', title: 'Excellence', desc: 'We never compromise on the quality of materials or craftsmanship.' },
  { icon: '🎨', title: 'Creativity',  desc: 'We bring your team\'s unique identity to life through design.' },
  { icon: '🤝', title: 'Reliability', desc: 'On-time delivery and consistent quality, every single order.' },
  { icon: '💡', title: 'Innovation',  desc: 'Continuously improving our processes and designs for you.' },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <h1 className="section-title about-hero__title">
            Crafting Champions'<br />Kits Since 2025
          </h1>
          <p className="section-subtitle">
            Based in Islamabad, Kit Lab has been outfitting teams with premium custom sportswear since 2025.
          </p>
        </div>
        <div className="about-hero__bg" aria-hidden="true" />
      </div>

      {/* Mission */}
      <section className="about-mission">
        <div className="container about-mission__inner">
          <div className="about-mission__text">
            <h2 className="section-title section-title--dark">
              Quality That Performs
            </h2>
            <p>
              We believe every team deserves to look and feel their best on the field.
              From grassroots clubs to professional academies, we supply high-grade, fully customizable sports kits that stand up to the demands of competitive sport.
            </p>
            <p>
              Based in Islamabad, we craft every kit with premium fabrics, professional printing, and attention to detail.
            </p>
            <Link to="/customize" className="btn btn-red">
              Start Customizing
            </Link>
          </div>
          <div className="about-mission__stats">
            {[
              { val: '500+', lbl: 'Teams Outfitted' },
              { val: '1+',   lbl: 'Years Experience' },
              { val: '16',   lbl: 'Unique Products' },
              { val: '7',    lbl: 'Day Avg. Delivery' },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="about-mission__stat">
                <span className="about-mission__stat-val">{val}</span>
                <span className="about-mission__stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map(({ title, desc }) => (
              <div key={title} className="about-values__card">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <h2 className="section-title section-title--dark">Our Milestones</h2>
          </div>
          <div className="about-timeline__list">
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className="about-timeline__item">
                <div className="about-timeline__year">{year}</div>
                <div className="about-timeline__dot" aria-hidden="true" />
                <div className="about-timeline__event">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2 className="about-cta__title">Ready to Outfit Your Team?</h2>
          <Link to="/customize" className="btn btn-gold">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}
