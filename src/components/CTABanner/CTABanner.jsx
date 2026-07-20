import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="bg-gold relative overflow-hidden py-16">
      <div
        className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.04)_0px,rgba(0,0,0,0.04)_1px,transparent_1px,transparent_20px)] pointer-events-none"
        aria-hidden="true"
      />
      <div className="container flex items-center justify-between gap-8 relative z-[1] max-[768px]:flex-col max-[768px]:text-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] tracking-[2px] uppercase text-bg-800 leading-[1.05]">Get Your Team Kit Today</h2>
          <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-[rgba(0,0,0,0.55)]">Custom Names &amp; Numbers Included</p>
        </div>
        <Link to="/customize" className="btn btn-red flex-shrink-0 text-[14px] px-12 py-4 rounded-md shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          Order Now
        </Link>
      </div>
    </section>
  );
}
