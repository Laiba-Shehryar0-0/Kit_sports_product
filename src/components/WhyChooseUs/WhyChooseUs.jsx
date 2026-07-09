import useInView from '../../hooks/useInView';
import './WhyChooseUs.css';

const FEATURES = [
  {
    icon: '🏆',
    title: 'Premium Quality',
    desc: 'High-grade fabrics engineered for maximum comfort, durability and performance on the field.',
  },
  {
    icon: '🎨',
    title: 'Custom Design',
    desc: 'Professional printing with custom names, numbers, and unique designs for your team\'s identity.',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Fast production and delivery to get your team ready for game day without the wait.',
  },
  {
    icon: '💰',
    title: 'Team Pricing',
    desc: 'Special bulk discounts and flexible payment options for teams of all sizes.',
  },
];

export default function WhyChooseUs() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();
  return (
    <section className="why">
      <div className="container">
        <div className={`why__header anim-fade-up${headerVisible ? ' is-visible' : ''}`} ref={headerRef}>
          <h2 className="section-title section-title--dark">
            Why Choose Kit Lab
          </h2>
          <p className="section-subtitle section-subtitle--dark">
            Experience the perfect blend of quality, customization, and passion in every kit
          </p>
        </div>

        <div className="why__grid" ref={gridRef}>
          {FEATURES.map(({ title, desc }, i) => (
            <div key={title} className={`why__card anim-fade-up delay-${i + 1}${gridVisible ? ' is-visible' : ''}`}>
              <h3 className="why__card-title">{title}</h3>
              <p className="why__card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
