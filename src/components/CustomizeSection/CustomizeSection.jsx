import { Link } from 'react-router-dom';
import component7 from '../../assets/Component 7.png';
import './CustomizeSection.css';

const OPTIONS = [
  { icon: '🎨', title: 'Custom Colors',  desc: 'Choose from unlimited color combinations' },
  { icon: '🔤', title: 'Font Styles',    desc: 'Multiple fonts for names and numbers' },
  { icon: '📝', title: 'Player Names',   desc: 'Add individual player names' },
  { icon: '🔢', title: 'Numbers',        desc: 'Professional numbering system' },
];

export default function CustomizeSection() {
  return (
    <section className="customize-sec">
      <div className="customize-sec__inner">
        <div className="customize-sec__content">
          <h2 className="section-title">
            Your Kit<br />Your Identity
          </h2>
          <p className="customize-sec__subtitle">
            Create unique team uniforms that reflect your style and spirit
          </p>

          <div className="customize-sec__options">
            {OPTIONS.map(({ title, desc }) => (
              <div key={title} className="customize-sec__option">
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="customize-sec__actions">
            <Link to="/customize" className="btn btn-gold">
              Start Customizing
            </Link>
            <Link to="/customize" className="btn btn-outline">
              Preview Kit
            </Link>
          </div>
        </div>

        <div className="customize-sec__preview" aria-hidden="true">
          <img src={component7} alt="Custom Kit" className="customize-sec__img" />
        </div>
      </div>
    </section>
  );
}

