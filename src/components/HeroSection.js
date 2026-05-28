import { Link } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__content">
        <div className="hero__text">
          <span className="hero__badge">CSP Community Service Project</span>
          <h1>Smart Hospital Queue &amp; Appointment Management</h1>
          <p>
            Register digitally, receive your token instantly, and track your position in
            real time. Empowering hospitals with efficient, transparent patient flow
            management.
          </p>
          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary btn--lg">
              Register as Patient
            </Link>
            <Link to="/queue" className="btn btn--outline btn--lg">
              View Live Queue
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__card hero__card--1">
            <span>🎫</span>
            <strong>Digital Tokens</strong>
            <small>Instant QR-enabled tokens</small>
          </div>
          <div className="hero__card hero__card--2">
            <span>⚡</span>
            <strong>Real-time Updates</strong>
            <small>Live Firestore sync</small>
          </div>
          <div className="hero__card hero__card--3">
            <span>🚨</span>
            <strong>Emergency Priority</strong>
            <small>Critical cases first</small>
          </div>
        </div>
      </div>
    </section>
  );
}
