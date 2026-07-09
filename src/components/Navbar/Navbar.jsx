import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, openSignIn, openSignUp } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e) => {
      if (!userMenuRef.current?.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
  };

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="Kit Lab" className="navbar__logo-img" />
        </Link>

        <nav className={`navbar__nav${menuOpen ? " navbar__nav--open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/kits"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
          >
            Kits
          </NavLink>
          <NavLink
            to="/customize"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
          >
            Customize
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
          >
            Contact
          </NavLink>

          {/* Mobile-only auth links */}
          {!user && (
            <div className="navbar__mobile-auth">
              <button
                className="navbar__link"
                onClick={() => {
                  setMenuOpen(false);
                  openSignIn();
                }}
              >
                Sign In
              </button>
              <button
                className="btn btn-red"
                onClick={() => {
                  setMenuOpen(false);
                  openSignUp();
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </nav>

        <div className="navbar__actions">
          {user ? (
            /* ── Logged-in state ── */
            <div className="navbar__user" ref={userMenuRef}>
              <button
                className="navbar__avatar"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-label="Account menu"
              >
                <span className="navbar__avatar-letter">{user.avatar}</span>
                <span className="navbar__avatar-name">
                  {user.name.split(" ")[0]}
                </span>
                <span className="navbar__avatar-caret">▾</span>
              </button>

              {userMenuOpen && (
                <div className="navbar__user-menu">
                  <div className="navbar__user-info">
                    <span className="navbar__user-avatar-lg">
                      {user.avatar}
                    </span>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="navbar__user-divider" />
                  <Link
                    to="/customize"
                    className="navbar__user-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Designs
                  </Link>
                  <Link
                    to="/kits"
                    className="navbar__user-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Browse Kits
                  </Link>
                  <div className="navbar__user-divider" />
                  <button
                    className="navbar__user-item navbar__user-item--logout"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged-out state ── */
            <div className="navbar__auth-btns">
              <button className="navbar__signin-btn" onClick={openSignIn}>
                Sign In
              </button>
              <button className="btn btn-gold navbar__cta" onClick={openSignUp}>
                Sign Up
              </button>
            </div>
          )}

          <button
            className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
