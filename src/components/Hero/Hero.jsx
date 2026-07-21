import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-surface-800 flex items-center overflow-hidden pt-[72px]">
      <div
        className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(204,0,0,0.15)_0%,transparent_65%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,166,35,0.08)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container flex flex-col items-center text-center pt-16 pb-16 w-full">
        <div className="flex flex-col items-center gap-5 z-[1] max-w-[780px]">
          <h1 className="animate-[heroSlideUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.05s_both] flex flex-col leading-none mt-1">
            <span className="font-display text-[clamp(3.5rem,9vw,8rem)] text-onsurface-100 tracking-[4px] uppercase max-[600px]:text-[clamp(3rem,14vw,5rem)]">PLAY WITH</span>
            <span className="font-display text-[clamp(3.5rem,9vw,8rem)] text-gold tracking-[4px] uppercase [text-shadow:0_0_60px_rgba(245,166,35,0.35)] max-[600px]:text-[clamp(3rem,14vw,5rem)]">PASSION</span>
          </h1>

          <p className="animate-[heroSlideUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.15s_both] text-[1.05rem] text-onsurface-500 max-w-[520px] leading-[1.75]">
            Based in Islamabad. High-grade fabrics, professional custom printing, and fast delivery. Get your team ready for game day.
          </p>

          <div className="animate-[heroSlideUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.28s_both] flex gap-4 mt-2 flex-wrap justify-center">
            <Link to="/kits" className="btn btn-red">
              Shop Kits
            </Link>
            <Link to="/customize" className="btn btn-outline">
              Get a Quote
            </Link>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <span className="block w-0.5 h-10 bg-[linear-gradient(to_bottom,transparent,var(--color-red))] animate-[scrollDrop_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

