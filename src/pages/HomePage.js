import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { SDG_GOALS } from "../utils/constants";
import "./HomePage.css";

const FEATURE_CARDS = [
  {
    icon: "📝",
    title: "Digital Registration",
    description: "Patients register online and receive unique tokens with QR codes instantly.",
  },
  {
    icon: "📺",
    title: "Live Queue Display",
    description: "Real-time queue updates powered by Firebase Firestore onSnapshot listeners.",
  },
  {
    icon: "👨‍⚕️",
    title: "Admin Dashboard",
    description: "Staff manage queues, call patients, and view statistics from one dashboard.",
  },
  {
    icon: "🚨",
    title: "Emergency Priority",
    description: "Critical patients are automatically prioritized in the waiting queue.",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />

      <section className="section container">
        <h2 className="section__title">System Overview</h2>
        <p className="section__subtitle">
          A complete digital solution for hospital queue and appointment management.
        </p>
        <div className="feature-grid">
          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className="feature-card card">
              <span className="feature-card__icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">About the Project</h2>
          <div className="about-grid">
            <div className="about-content">
              <p>
                The <strong>Smart Hospital Queue &amp; Appointment Management System</strong> is a
                Community Service Programme (CSP) final-year project designed to modernize
                outpatient flow in hospitals and health centers.
              </p>
              <p>
                By replacing manual paper tokens with a cloud-based digital queue, the system
                reduces waiting-room congestion, improves transparency, and helps medical staff
                serve patients more efficiently — especially during peak hours.
              </p>
              <Link to="/register" className="btn btn--primary">
                Get Started →
              </Link>
            </div>
            <div className="about-stats card">
              <div className="about-stat">
                <strong>Real-time</strong>
                <span>Firestore sync</span>
              </div>
              <div className="about-stat">
                <strong>100%</strong>
                <span>Digital tokens</span>
              </div>
              <div className="about-stat">
                <strong>24/7</strong>
                <span>Cloud access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section__title">UN Sustainable Development Goals</h2>
        <p className="section__subtitle">
          This project aligns with global SDG targets for healthier, more innovative communities.
        </p>
        <div className="sdg-grid">
          {SDG_GOALS.map((sdg) => (
            <article key={sdg.id} className="sdg-card card">
              <span className="sdg-card__icon">{sdg.icon}</span>
              <span className="sdg-card__id">SDG {sdg.id}</span>
              <h3>{sdg.title}</h3>
              <p>{sdg.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">Patent &amp; Innovation</h2>
          <div className="innovation-card card">
            <div className="innovation-card__icon">💡</div>
            <div>
              <h3>Novel Digital Queue Architecture</h3>
              <p>
                Our innovation combines <strong>priority-aware queue sorting</strong>,{" "}
                <strong>QR-verified digital tokens</strong>, and{" "}
                <strong>real-time Firestore synchronization</strong> in a lightweight,
                deployment-ready web application suitable for resource-constrained healthcare
                facilities.
              </p>
              <ul className="innovation-list">
                <li>Automatic emergency patient prioritization algorithm</li>
                <li>QR-encoded token verification for anti-fraud measures</li>
                <li>Zero-install patient access via responsive web UI</li>
                <li>Scalable Firebase backend with minimal infrastructure cost</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section__title">Community Service Impact</h2>
        <div className="impact-grid">
          <article className="impact-card card">
            <span>👥</span>
            <h3>Patients</h3>
            <p>Reduced wait anxiety with transparent queue position and estimated flow visibility.</p>
          </article>
          <article className="impact-card card">
            <span>🏥</span>
            <h3>Hospitals</h3>
            <p>Improved staff efficiency, better crowd management, and data-driven queue analytics.</p>
          </article>
          <article className="impact-card card">
            <span>🌍</span>
            <h3>Community</h3>
            <p>Equitable access to healthcare services, supporting underserved rural and urban clinics.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
