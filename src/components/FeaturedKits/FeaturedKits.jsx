import { Link, useNavigate } from "react-router-dom";
import useInView from "../../hooks/useInView";
import cricketImg from "../../assets/cricket.jfif";
import footballImg from "../../assets/football.jpg";
import basketballImg from "../../assets/basketball.jfif";
import trainingImg from "../../assets/training.jfif";
const KITS = [
  {
    id: 1,
    image: cricketImg,
    emoji: "🏏",
    tag: "Featured",
    sport: "cricket",
    title: "Cricket Kit",
    desc: "Premium uniform with professional cut and breathable fabric.",
    color: "#8B6914",
    accent: "#F5A623",
    tagBg: "#3d3000",
    hoverRgb: "138, 112, 0",
  },
  {
    id: 2,
    image: footballImg,
    emoji: "⚽",
    tag: "Featured",
    sport: "football",
    title: "Football Kit",
    desc: "Professional football jersey with moisture-wicking technology.",
    color: "#1a4a1a",
    accent: "#4CAF50",
    tagBg: "#0a2a0a",
    hoverRgb: "26, 92, 26",
  },
  {
    id: 3,
    image: basketballImg,
    emoji: "🏀",
    tag: "Featured",
    sport: "basketball",
    title: "Basketball Kit",
    desc: "High-performance basketball uniform with enhanced mobility.",
    color: "#1a2a4a",
    accent: "#2196F3",
    tagBg: "#040f30",
    hoverRgb: "10, 42, 106",
  },
  {
    id: 4,
    image: trainingImg,
    emoji: "💪",
    tag: "Featured",
    sport: "training",
    title: "Training Kit",
    desc: "Comfortable training wear perfect for practice sessions.",
    color: "#2a1a2a",
    accent: "#9C27B0",
    tagBg: "#20003a",
    hoverRgb: "74, 10, 106",
  },
];

export default function FeaturedKits() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();
  return (
    <section className="bg-bg-800 py-24">
      <div className="container">
        <div
          className={`flex justify-between items-end mb-12 gap-6 max-[1024px]:flex-col max-[1024px]:items-start anim-fade-up${headerVisible ? " is-visible" : ""}`}
          ref={headerRef}
        >
          <div className="flex flex-col items-start gap-3">
            <h2 className="section-title">Featured Sports Kits</h2>
            <p className="section-subtitle">
              Discover our premium collection of custom sports uniforms designed
              for champions
            </p>
          </div>
          <Link to="/kits" className="btn btn-outline flex-shrink-0 self-end">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1" ref={gridRef}>
          {KITS.map((kit, i) => (
            <div
              key={kit.id}
              className={`anim-scale-in delay-${i + 1}${gridVisible ? " is-visible" : ""}`}
            >
              <KitCard kit={kit} isThird={i === 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KitCard({ kit, isThird }) {
  const navigate = useNavigate();

  return (
    <Link
      to={`/kits?sport=${kit.sport}`}
      className="block bg-[var(--kit-color,var(--color-bg-600))] border border-border-dark rounded-[20px] overflow-hidden transition-[transform_0.3s_ease,box-shadow_0.3s_ease,filter_0.3s_ease] cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(var(--kit-hover-rgb,var(--black-rgb)),0.4)] hover:brightness-[1.15]"
      style={{
        "--kit-color": kit.color,
        "--kit-accent": kit.accent,
        textDecoration: "none",
      }}
    >
      <div className="relative aspect-[1] flex items-center justify-center bg-[linear-gradient(135deg,var(--kit-color,var(--color-bg-600))_0%,rgba(0,0,0,0.6)_100%)] rounded-t-[20px]">
        {kit.image ? (
          <img
            src={kit.image}
            alt={kit.title}
            className={`w-full h-full object-cover${isThird ? ' object-[center_30%]' : ''}`}
          />
        ) : (
          <div className="w-[100px] h-[100px] bg-[rgba(255,255,255,0.08)] rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
            <span className="text-[3rem]">{kit.emoji}</span>
          </div>
        )}
      </div>
      <div className="py-5 px-5 bg-bg-600 border-t border-border-dark">
        <h3 className="text-[15px] font-bold tracking-[0.5px] text-light-100 mb-2">{kit.title}</h3>
        <p className="text-[0.8rem] text-light-500 leading-[1.65] mb-4">{kit.desc}</p>
        <button
          type="button"
          className="text-[11px] font-bold tracking-[1px] uppercase text-gold flex items-center gap-2 transition-[gap_150ms_ease] bg-transparent border-none p-0 [font-family:inherit] cursor-pointer hover:gap-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/customize");
          }}
        >
          Customize <span>→</span>
        </button>
      </div>
    </Link>
  );
}
