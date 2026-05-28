import { APP_NAME } from "../utils/constants";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">🏥</span>
          <h3>{APP_NAME}</h3>
          <p>Digital healthcare queue management for efficient patient flow.</p>
        </div>
        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/register">Patient Registration</a></li>
            <li><a href="/queue">Live Queue</a></li>
            <li><a href="/token-display">Token Display</a></li>
            <li><a href="/admin">Admin Dashboard</a></li>
          </ul>
        </div>
        <div className="footer__contact">
          <h4>Contact</h4>
          <p>📧 support@smarthospitalqueue.org</p>
          <p>📞 +91 1800-XXX-XXXX</p>
          <p>📍 Community Health Center, India</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {year} {APP_NAME}. CSP Final Year Project — Community Service Programme.</p>
      </div>
    </footer>
  );
}
