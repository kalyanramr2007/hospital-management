import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { APP_NAME, NAV_LINKS } from "../utils/constants";
import DarkModeToggle from "./DarkModeToggle";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__logo" aria-hidden="true">
            🏥
          </span>
          <span className="navbar__title">{APP_NAME}</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <DarkModeToggle />
        </nav>
      </div>
      {menuOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      )}
    </header>
  );
}
