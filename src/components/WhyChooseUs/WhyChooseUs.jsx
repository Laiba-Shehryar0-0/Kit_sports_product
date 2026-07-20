import useInView from '../../hooks/useInView';

const FEATURES = [
  {
    icon: '🏆',
    title: 'Premium Quality',
    desc: 'High-grade fabrics engineered for maximum comfort, durability and performance on the field.',
    accent: 'border-t-red',
  },
  {
    icon: '🎨',
    title: 'Custom Design',
    desc: 'Professional printing with custom names, numbers, and unique designs for your team\'s identity.',
    accent: 'border-t-gold',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Fast production and delivery to get your team ready for game day without the wait.',
    accent: 'border-t-charcoal',
  },
  {
    icon: '💰',
    title: 'Team Pricing',
    desc: 'Special bulk discounts and flexible payment options for teams of all sizes.',
    accent: 'border-t-silver',
  },
];

export default function WhyChooseUs() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();
  return (
    <section className="bg-light-200 py-24">
      <div className="container">
        <div
          className={`text-center max-w-full mx-auto mb-16 flex flex-col items-center gap-4 anim-fade-up${headerVisible ? ' is-visible' : ''}`}
          ref={headerRef}
        >
          <h2 className="section-title section-title--dark">
            Why Choose Kit Lab
          </h2>
          <p className="section-subtitle section-subtitle--dark whitespace-nowrap">
            Experience the perfect blend of quality, customization, and passion in every kit
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 max-[1024px]:grid-cols-2 max-[500px]:grid-cols-1" ref={gridRef}>
          {FEATURES.map(({ title, desc, accent }, i) => (
            <div
              key={title}
              className={`bg-light-100 border border-light-300 rounded-[10px] py-8 px-6 text-center transition-[transform_250ms_ease,box-shadow_250ms_ease] border-t-4 ${accent} hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] anim-fade-up delay-${i + 1}${gridVisible ? ' is-visible' : ''}`}
            >
              <h3 className="font-body text-[14px] font-extrabold tracking-[1.5px] uppercase text-bg-800 mb-3">{title}</h3>
              <p className="text-[0.875rem] text-light-700 leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
