import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import logo from "../../assets/logo.png";

const navLinkBase = "text-[12px] font-semibold tracking-[1.5px] uppercase no-underline py-1 border-b-2 transition-[color_150ms_ease,border-color_150ms_ease] hover:text-onsurface-100 hover:border-b-red max-[900px]:text-[18px] max-[900px]:tracking-[3px]";
const navLinkCls = (isActive) => `${navLinkBase} ${isActive ? 'text-onsurface-100 border-b-red' : 'text-onsurface-400 border-b-transparent'}`;
const userItemCls = "flex items-center gap-3 w-full py-3 px-5 text-[12px] font-semibold tracking-[0.5px] bg-transparent border-none cursor-pointer no-underline transition-[background_150ms_ease,color_150ms_ease,padding-left_150ms_ease] text-left hover:pl-6";

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
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] border-b transition-[background_250ms_ease,border-color_250ms_ease,box-shadow_250ms_ease] ${scrolled ? 'bg-[rgba(var(--color-surface-900-rgb),0.97)] border-line shadow-[0_2px_24px_rgba(0,0,0,0.6)] backdrop-blur-[12px]' : 'bg-surface-900 border-transparent'}`}
    >
      <div className="container flex items-center h-[72px] gap-8">
        <Link to="/" className="flex items-center gap-3 no-underline flex-shrink-0">
          <img src={logo} alt="Sports Hub" className="h-[130px] w-auto object-contain rounded-[6px]" />
        </Link>

        <nav
          className={`flex items-center gap-8 ml-auto max-[900px]:fixed max-[900px]:top-[72px] max-[900px]:left-0 max-[900px]:right-0 max-[900px]:bottom-0 max-[900px]:bg-surface-900 max-[900px]:flex-col max-[900px]:justify-center max-[900px]:gap-8 max-[900px]:transition-[transform_250ms_ease] ${menuOpen ? 'max-[900px]:translate-x-0' : 'max-[900px]:translate-x-full'}`}
        >
          <NavLink to="/" end className={({ isActive }) => navLinkCls(isActive)}>
            Home
          </NavLink>
          <NavLink to="/kits" className={({ isActive }) => navLinkCls(isActive)}>
            Kits
          </NavLink>
          <NavLink to="/customize" className={({ isActive }) => navLinkCls(isActive)}>
            Customize
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navLinkCls(isActive)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => navLinkCls(isActive)}>
            Contact
          </NavLink>

          {/* Mobile-only auth links */}
          <div className="hidden flex-col items-center gap-4 mt-6 max-[900px]:flex">
            <ThemeToggle />
            {!user && (
              <>
                <button
                  className={navLinkCls(false)}
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
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3 ml-4">
          <ThemeToggle className="max-[900px]:hidden" />
          {user ? (
            /* ── Logged-in state ── */
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center gap-2 bg-surface-600 border-[1.5px] border-line-strong py-[5px] pr-3 pl-[5px] cursor-pointer text-onsurface-100 rounded-[8px] transition-[all_220ms_ease] hover:border-gold hover:bg-surface-500 hover:shadow-[0_4px_14px_rgba(245,166,35,0.2)] hover:-translate-y-px active:translate-y-0"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-label="Account menu"
              >
                <span className="w-7 h-7 bg-red text-light-100 font-extrabold text-[13px] rounded-full flex items-center justify-center flex-shrink-0">{user.avatar}</span>
                <span className="text-[12px] font-semibold tracking-[0.5px] max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {user.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-onsurface-500 ml-[2px]">▾</span>
              </button>

              {userMenuOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 bg-surface-700 border border-line-strong border-t-[3px] border-t-red min-w-[240px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-[8px] z-[500] overflow-hidden animate-[dropIn_180ms_cubic-bezier(0.22,1,0.36,1)]">
                  <div className="flex items-center gap-3 py-4 px-5">
                    <span className="w-10 h-10 bg-red text-light-100 font-extrabold text-[16px] rounded-full flex items-center justify-center flex-shrink-0">
                      {user.avatar}
                    </span>
                    <div className="flex flex-col gap-[2px] overflow-hidden">
                      <strong className="text-[13px] text-onsurface-100 whitespace-nowrap overflow-hidden text-ellipsis">{user.name}</strong>
                      <span className="text-[11px] text-onsurface-600 whitespace-nowrap overflow-hidden text-ellipsis">{user.email}</span>
                    </div>
                  </div>
                  <div className="h-px bg-line" />
                  <Link
                    to="/customize"
                    className={`${userItemCls} text-onsurface-400 hover:bg-surface-600 hover:text-onsurface-100`}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Designs
                  </Link>
                  <Link
                    to="/kits"
                    className={`${userItemCls} text-onsurface-400 hover:bg-surface-600 hover:text-onsurface-100`}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Browse Kits
                  </Link>
                  <div className="h-px bg-line" />
                  <button
                    className={`${userItemCls} text-danger hover:bg-[rgba(255,107,107,0.1)] hover:text-danger`}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged-out state ── */
            <div className="flex items-center gap-3">
              <button
                className="bg-transparent border-[1.5px] border-line-strong text-onsurface-300 text-[11px] font-bold tracking-[1px] uppercase py-2 px-[18px] cursor-pointer rounded-[6px] transition-[all_220ms_ease] relative overflow-hidden hover:border-onsurface-100 hover:text-onsurface-100 hover:bg-[rgba(255,255,255,0.06)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(255,255,255,0.08)] active:translate-y-0"
                onClick={openSignIn}
              >
                Sign In
              </button>
              <button
                className="btn btn-gold py-[10px] px-5 text-[11px] hover:shadow-[0_2px_8px_rgba(245,166,35,0.25),0_2px_0_rgba(0,0,0,0.2)] hover:translate-y-0 hover:filter-none"
                onClick={openSignUp}
              >
                Sign Up
              </button>
            </div>
          )}

          <button
            className="hidden flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border border-line cursor-pointer p-2 rounded-sm max-[900px]:flex"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-full h-0.5 bg-onsurface-100 transition-[transform_250ms_ease,opacity_250ms_ease] [transform-origin:center]${menuOpen ? ' translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-full h-0.5 bg-onsurface-100 transition-[transform_250ms_ease,opacity_250ms_ease] [transform-origin:center]${menuOpen ? ' opacity-0' : ''}`} />
            <span className={`block w-full h-0.5 bg-onsurface-100 transition-[transform_250ms_ease,opacity_250ms_ease] [transform-origin:center]${menuOpen ? ' -translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
