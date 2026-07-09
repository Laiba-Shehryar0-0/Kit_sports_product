import { Link, useNavigate } from "react-router-dom";
import useInView from "../../hooks/useInView";
import cricketImg from "../../assets/cricket.jfif";
import footballImg from "../../assets/football.jpg";
import basketballImg from "../../assets/basketball.jfif";
import trainingImg from "../../assets/training.jfif";
import "./FeaturedKits.css";

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
  },
];

export default function FeaturedKits() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();
  return (
    <section className="featured">
      <div className="container">
        <div
          className={`featured__header anim-fade-up${headerVisible ? " is-visible" : ""}`}
          ref={headerRef}
        >
          <div>
            <h2 className="section-title">Featured Sports Kits</h2>
            <p className="section-subtitle">
              Discover our premium collection of custom sports uniforms designed
              for champions
            </p>
          </div>
          <Link to="/kits" className="btn btn-outline featured__view-all">
            View All
          </Link>
        </div>

        <div className="featured__grid" ref={gridRef}>
          {KITS.map((kit, i) => (
            <div
              key={kit.id}
              className={`anim-scale-in delay-${i + 1}${gridVisible ? " is-visible" : ""}`}
            >
              <KitCard kit={kit} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KitCard({ kit }) {
  const navigate = useNavigate();

  return (
    <Link
      to={`/kits?sport=${kit.sport}`}
      className="kit-card"
      style={{
        "--kit-color": kit.color,
        "--kit-accent": kit.accent,
        textDecoration: "none",
      }}
    >
      <div className="kit-card__image">
        {kit.image ? (
          <img src={kit.image} alt={kit.title} className="kit-card__img" />
        ) : (
          <div className="kit-card__emoji-wrap">
            <span className="kit-card__emoji">{kit.emoji}</span>
          </div>
        )}
      </div>
      <div className="kit-card__body">
        <h3 className="kit-card__title">{kit.title}</h3>
        <p className="kit-card__desc">{kit.desc}</p>
        <button
          type="button"
          className="kit-card__cta"
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
