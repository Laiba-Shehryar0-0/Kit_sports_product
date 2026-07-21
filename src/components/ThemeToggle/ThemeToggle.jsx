import { useTheme } from '../../context/ThemeContext';

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" {...props}>
      <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1Z" />
    </svg>
  );
}

/** Sun/moon pill switch — toggles the site between dark and light theme. */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className={`relative inline-flex items-center flex-shrink-0 w-[52px] h-7 rounded-full border transition-[background-color,border-color] duration-300 ease-in-out cursor-pointer bg-surface-600 border-line hover:border-line-strong ${className}`}
    >
      <span className="absolute left-1.5 text-gold-muted opacity-70">
        <SunIcon />
      </span>
      <span className="absolute right-1.5 text-onsurface-400 opacity-70">
        <MoonIcon />
      </span>
      <span
        className={`relative z-[1] flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-b from-white to-[#e6e6ea] shadow-[0_1px_3px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-in-out ${isLight ? 'translate-x-[27px]' : 'translate-x-1'}`}
      >
        <span
          key={theme}
          className="flex items-center justify-center animate-[themeIconPop_260ms_cubic-bezier(0.34,1.56,0.64,1)]"
        >
          {isLight ? <SunIcon className="text-gold-dark" /> : <MoonIcon className="text-bg-700" />}
        </span>
      </span>
    </button>
  );
}
