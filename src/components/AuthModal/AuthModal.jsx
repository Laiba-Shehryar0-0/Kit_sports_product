import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

export default function AuthModal() {
  const { authModal, closeModal, signIn, signUp } = useAuth();
  const { open, tab: initialTab } = authModal;

  const [tab,      setTab]      = useState(initialTab);
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const firstInputRef = useRef(null);

  // Sync tab when modal opens from outside
  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setError('');
      setName(''); setEmail(''); setPassword(''); setConfirm('');
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [open, initialTab]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeModal]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const switchTab = (t) => {
    setTab(t);
    setError('');
    setName(''); setEmail(''); setPassword(''); setConfirm('');
  };

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim())              return setError('Email address is required.');
    if (!validateEmail(email))      return setError('Please enter a valid email address.');
    if (!password)                  return setError('Password is required.');

    if (tab === 'signup') {
      if (!name.trim())             return setError('Full name is required.');
      if (password.length < 6)      return setError('Password must be at least 6 characters.');
      if (!/[A-Z]/.test(password))  return setError('Password must contain at least one uppercase letter.');
      if (!/[0-9]/.test(password))  return setError('Password must contain at least one number.');
      if (password !== confirm)     return setError('Passwords do not match.');
    } else {
      if (password.length < 6)      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 600)); // simulate network
      if (tab === 'signin') {
        signIn(email, password);
      } else {
        signUp(name.trim(), email, password);
      }
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-label={tab === 'signin' ? 'Sign In' : 'Create Account'}>
        {/* Close button */}
        <button className="auth-modal__close" onClick={closeModal} aria-label="Close">✕</button>

        {/* Brand */}
        <div className="auth-modal__brand">
          <span className="auth-modal__brand-name">Kit Lab</span>
        </div>

        {/* Tabs */}
        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab${tab === 'signin' ? ' auth-modal__tab--active' : ''}`}
            onClick={() => switchTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`auth-modal__tab${tab === 'signup' ? ' auth-modal__tab--active' : ''}`}
            onClick={() => switchTab('signup')}
          >
            Create Account
          </button>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit} noValidate>
          {tab === 'signup' && (
            <div className="auth-modal__field">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                ref={tab === 'signup' ? firstInputRef : null}
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-modal__field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              ref={tab === 'signin' ? firstInputRef : null}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-modal__field">
            <label htmlFor="auth-password">Password</label>
            <div className="auth-modal__pw-wrap">
              <input
                id="auth-password"
                type={showPwd ? 'text' : 'password'}
                placeholder={tab === 'signup' ? 'Min. 6 characters' : 'Your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="auth-modal__pw-toggle"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {tab === 'signup' && (
            <div className="auth-modal__field">
              <label htmlFor="auth-confirm">Confirm Password</label>
              <input
                id="auth-confirm"
                type={showPwd ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <p className="auth-modal__error" role="alert">
              ⚠ {error}
            </p>
          )}

          <button
            type="submit"
            className={`btn btn-red auth-modal__submit${loading ? ' auth-modal__submit--loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? 'Please wait…'
              : tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="auth-modal__switch">
            {tab === 'signin' ? (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => switchTab('signup')}>Sign up free</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => switchTab('signin')}>Sign in</button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
