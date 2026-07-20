import { Link } from 'react-router-dom';
import component7 from '../../assets/Component 7.png';

const OPTIONS = [
  { icon: '🎨', title: 'Custom Colors',  desc: 'Choose from unlimited color combinations' },
  { icon: '🔤', title: 'Font Styles',    desc: 'Multiple fonts for names and numbers' },
  { icon: '📝', title: 'Player Names',   desc: 'Add individual player names' },
  { icon: '🔢', title: 'Numbers',        desc: 'Professional numbering system' },
];

export default function CustomizeSection() {
  return (
    <section className="bg-red py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:text-center">
        <div className="flex flex-col items-start gap-6">
          <h2 className="section-title text-light-100">
            Your Kit<br />Your Identity
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.75)] leading-[1.7]">
            Create unique team uniforms that reflect your style and spirit
          </p>

          <div className="grid grid-cols-2 gap-4 max-[900px]:text-left">
            {OPTIONS.map(({ title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-[rgba(0,0,0,0.2)] p-4 border border-[rgba(255,255,255,0.1)] rounded-[12px] cursor-pointer transition-[background_250ms_ease,border-color_250ms_ease,transform_250ms_ease,box-shadow_250ms_ease] hover:bg-[rgba(139,0,0,0.35)] hover:border-red hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(139,0,0,0.3)]"
              >
                <div>
                  <strong className="block text-[12px] font-bold tracking-[1px] uppercase text-light-100 mb-[2px]">{title}</strong>
                  <p className="text-[0.8rem] text-[rgba(255,255,255,0.65)] leading-[1.5]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap max-[900px]:justify-center">
            <Link to="/customize" className="btn btn-gold">
              Start Customizing
            </Link>
            <Link
              to="/customize"
              className="btn btn-outline border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.15)] hover:text-light-100"
            >
              Preview Kit
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center max-[900px]:order-[-1]" aria-hidden="true">
          <img src={component7} alt="Custom Kit" className="w-full max-w-[380px] h-auto animate-[jerseyFloat_4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

