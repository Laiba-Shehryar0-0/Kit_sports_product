import { Link } from 'react-router-dom';

const STAT_ACCENTS = ['border-t-red', 'border-t-gold', 'border-t-charcoal', 'border-t-silver'];

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
    <div className="min-h-screen bg-bg-800 pt-[72px]">
      {/* Hero */}
      <div className="relative bg-bg-900 pt-20 pb-16 border-b border-border-dark overflow-hidden">
        <div className="container flex flex-col items-start gap-5 relative z-[1]">
          <h1 className="section-title max-w-[640px]">
            Crafting Champions'<br />Kits Since 2025
          </h1>
          <p className="section-subtitle">
            Based in Islamabad, Kit Lab has been outfitting teams with premium custom sportswear since 2025.
          </p>
        </div>
        <div
          className="absolute top-[-20%] right-[-10%] w-1/2 h-[140%] bg-[linear-gradient(135deg,rgba(204,0,0,0.06)_0%,transparent_60%)] [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Mission */}
      <section className="bg-light-100 py-24">
        <div className="container grid grid-cols-[1.3fr_1fr] gap-16 items-center max-[1024px]:grid-cols-1">
          <div className="flex flex-col items-start gap-5">
            <h2 className="section-title section-title--dark">
              Quality That Performs
            </h2>
            <p className="text-[0.95rem] text-light-700 leading-[1.8]">
              We believe every team deserves to look and feel their best on the field.
              From grassroots clubs to professional academies, we supply high-grade, fully customizable sports kits that stand up to the demands of competitive sport.
            </p>
            <p className="text-[0.95rem] text-light-700 leading-[1.8]">
              Based in Islamabad, we craft every kit with premium fabrics, professional printing, and attention to detail.
            </p>
            <Link to="/customize" className="btn btn-red">
              Start Customizing
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { val: '500+', lbl: 'Teams Outfitted' },
              { val: '1+',   lbl: 'Years Experience' },
              { val: '16',   lbl: 'Unique Products' },
              { val: '7',    lbl: 'Day Avg. Delivery' },
            ].map(({ val, lbl }, i) => (
              <div
                key={lbl}
                className={`bg-[#f0f0f0] p-6 flex flex-col items-center text-center gap-2 border-t-4 rounded-[12px] transition-[transform_250ms_ease,box-shadow_250ms_ease,background_250ms_ease] cursor-default hover:-translate-y-[5px] hover:bg-light-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] ${STAT_ACCENTS[i]}`}
              >
                <span className="font-display text-[2.4rem] text-gold tracking-[2px]">{val}</span>
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-light-500">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-800 py-24">
        <div className="container">
          <div className="flex flex-col gap-4 mb-12 text-center items-center">
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {VALUES.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-bg-600 border border-border-dark py-8 px-6 text-center transition-[border-color_250ms_ease,transform_250ms_ease] hover:border-border-medium hover:-translate-y-1"
              >
                <h3 className="text-[14px] font-bold tracking-[1px] uppercase text-light-100 mb-3">{title}</h3>
                <p className="text-[0.85rem] text-light-500 leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-light-100 py-24">
        <div className="container">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="section-title section-title--dark">Our Milestones</h2>
          </div>
          <div className="max-w-[700px] mx-auto flex flex-col relative before:content-[''] before:absolute before:left-[80px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[linear-gradient(to_bottom,var(--color-red),var(--color-gold))] max-[600px]:before:left-[60px]">
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className="flex items-center gap-5 py-5">
                <div className="w-[70px] font-display text-[1.4rem] text-red tracking-[1px] text-right flex-shrink-0">{year}</div>
                <div
                  className="w-4 h-4 bg-red rounded-full border-[3px] border-light-100 shadow-[0_0_0_2px_var(--color-red)] flex-shrink-0 relative z-[1]"
                  aria-hidden="true"
                />
                <div className="text-[0.95rem] font-semibold text-bg-700">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red py-16">
        <div className="container flex items-center justify-between gap-8 flex-wrap max-[600px]:flex-col max-[600px]:text-center">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] tracking-[2px] uppercase text-light-100">Ready to Outfit Your Team?</h2>
          <Link to="/customize" className="btn btn-gold">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}
