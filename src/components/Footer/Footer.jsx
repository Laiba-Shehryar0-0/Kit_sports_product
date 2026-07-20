import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const linkCls = 'text-[0.875rem] text-light-600 no-underline transition-[color_150ms_ease] hover:text-gold';
const legalCls = 'text-[0.8rem] text-light-600 no-underline transition-[color_150ms_ease] hover:text-light-100';

export default function Footer() {
  return (
    <footer className="bg-bg-900 border-t border-border-dark">
      <div className="container grid grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pt-16 pb-12 items-start max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 no-underline -mt-[60px]">
            <img src={logo} alt="Kit Lab" className="h-[130px] w-auto object-contain" />
          </Link>
          <p className="text-[0.8rem] text-light-600 leading-[1.7] max-w-[260px]">
            Premium custom sports kits for teams and individuals. Play with passion.
          </p>
          <div className="flex gap-3 mt-6 mb-6">
            <a
              href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 bg-bg-600 border border-border-dark rounded-[6px] flex items-center justify-center text-light-400 transition-[background_150ms_ease,border-color_150ms_ease,color_150ms_ease] no-underline hover:bg-red hover:border-red hover:text-light-100"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.884v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>
            <a
              href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 bg-bg-600 border border-border-dark rounded-[6px] flex items-center justify-center text-light-400 transition-[background_150ms_ease,border-color_150ms_ease,color_150ms_ease] no-underline hover:bg-red hover:border-red hover:text-light-100"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
              className="w-9 h-9 bg-bg-600 border border-border-dark rounded-[6px] flex items-center justify-center text-light-400 transition-[background_150ms_ease,border-color_150ms_ease,color_150ms_ease] no-underline hover:bg-red hover:border-red hover:text-light-100"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-muted mb-5">Kit Lab</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className={linkCls}>Home</Link></li>
            <li><Link to="/kits" className={linkCls}>Kits</Link></li>
            <li><Link to="/customize" className={linkCls}>Customize</Link></li>
            <li><a href="/#contact" className={linkCls}>Contact</a></li>
          </ul>
        </div>

        {/* Sports */}
        <div>
          <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-muted mb-5">Sports</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/kits" className={linkCls}>Cricket</Link></li>
            <li><Link to="/kits" className={linkCls}>Football</Link></li>
            <li><Link to="/kits" className={linkCls}>Basketball</Link></li>
            <li><Link to="/kits" className={linkCls}>Training</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-muted mb-5">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li className="text-[0.875rem] text-light-600 leading-[1.6]">+92 334 6688701</li>
            <li className="text-[0.875rem] text-light-600 leading-[1.6]">+92 314 7512811</li>
            <li className="text-[0.875rem] text-light-600 leading-[1.6]">kitlab@gmail.com</li>
            <li className="text-[0.875rem] text-light-600 leading-[1.6]">Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-dark py-5">
        <div className="container flex justify-between items-center gap-4 flex-wrap max-[600px]:flex-col max-[600px]:text-center">
          <p className="text-[0.8rem] text-light-600">
            © 2025 Kit Lab. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className={legalCls}>Privacy Policy</a>
            <a href="#" className={legalCls}>Terms of Service</a>
            <a href="#" className={legalCls}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
