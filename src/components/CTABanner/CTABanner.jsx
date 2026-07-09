import { Link } from 'react-router-dom';
import './CTABanner.css';

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg" aria-hidden="true" />
      <div className="container cta-banner__inner">
        <div className="cta-banner__content">
          <h2 className="cta-banner__title">Get Your Team Kit Today</h2>
          <p className="cta-banner__sub">Custom Names &amp; Numbers Included</p>
        </div>
        <Link to="/customize" className="btn btn-red cta-banner__btn">
          Order Now
        </Link>
      </div>
    </section>
  );
}
