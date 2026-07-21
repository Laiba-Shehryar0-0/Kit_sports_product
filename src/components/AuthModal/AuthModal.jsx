import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo-mark.png';
import { IconEye, IconEyeOff } from '../../customize/icons';
import { required, email as emailRule, minLength, pattern, matches, validateFields } from '../../utils/validation';

const fieldInputCls = 'bg-surface-600 border border-line text-onsurface-100 py-[10px] px-4 text-[0.9rem] outline-none transition-[border-color_150ms_ease,box-shadow_150ms_ease] w-full rounded-[8px] placeholder:text-onsurface-600 focus:border-line-strong';

export default function AuthModal() {
  const { authModal, closeModal, signIn, signUp, loading, error: authError, setError: setAuthError } = useAuth();
  const { open, tab: initialTab } = authModal;

  const [tab,      setTab]      = useState(initialTab);
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [validationError, setValidationError] = useState('');
  const error = validationError || authError;
  const firstInputRef = useRef(null);

  // Sync tab when modal opens from outside
  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setValidationError('');
      setAuthError('');
      setName(''); setEmail(''); setPassword(''); setConfirm('');
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [open, initialTab, setAuthError]);

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
    setValidationError('');
    setAuthError('');
    setName(''); setEmail(''); setPassword(''); setConfirm('');
  };

  const SIGNUP_SCHEMA = {
    name: [required('Full name is required.')],
    email: [required('Email address is required.'), emailRule()],
    password: [
      required('Password is required.'),
      minLength(6, 'Password must be at least 6 characters.'),
      pattern(/[A-Z]/, 'Password must contain at least one uppercase letter.'),
      pattern(/[0-9]/, 'Password must contain at least one number.'),
    ],
    confirm: [matches(v => v.password, 'Passwords do not match.')],
  };
  const SIGNIN_SCHEMA = {
    email: [required('Email address is required.'), emailRule()],
    password: [required('Password is required.'), minLength(6, 'Password must be at least 6 characters.')],
  };
  const SIGNIN_FIELD_ORDER = ['email', 'password'];
  const SIGNUP_FIELD_ORDER = ['name', 'email', 'password', 'confirm'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setAuthError('');

    const isSignup = tab === 'signup';
    const fieldErrors = validateFields(
      { name, email, password, confirm },
      isSignup ? SIGNUP_SCHEMA : SIGNIN_SCHEMA,
    );
    const firstError = (isSignup ? SIGNUP_FIELD_ORDER : SIGNIN_FIELD_ORDER)
      .map(f => fieldErrors[f]).find(Boolean);
    if (firstError) return setValidationError(firstError);

    try {
      if (tab === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(name.trim(), email, password);
      }
      closeModal();
    } catch {
      // error message is already set on the auth context
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] backdrop-blur-[6px] z-[2000] flex items-center justify-center p-4 animate-[overlayIn_200ms_ease]"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        className="bg-surface-700 border-none rounded-[14px] w-full max-w-[440px] max-h-[90vh] overflow-y-auto py-6 px-8 relative animate-[modalIn_220ms_cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_24px_80px_rgba(0,0,0,0.7)] max-[480px]:py-8 max-[480px]:px-5"
        role="dialog" aria-modal="true" aria-label={tab === 'signin' ? 'Sign in' : 'Create account'}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 bg-surface-500 border border-line text-onsurface-500 w-8 h-8 flex items-center justify-center text-[12px] cursor-pointer rounded-full transition-[all_220ms_ease] hover:bg-red hover:border-red hover:text-light-100 hover:rotate-90 hover:scale-110 hover:shadow-[0_4px_12px_rgba(204,0,0,0.4)] active:rotate-90 active:scale-95"
          onClick={closeModal} aria-label="Close"
        >✕</button>

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src={logo} alt="Sports Hub" className="h-[52px] w-auto object-contain" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-line mb-4">
          <button
            className={`flex-1 py-2 px-4 text-[13px] font-bold tracking-[0.5px] bg-transparent border-none cursor-pointer border-b-2 transition-[color_150ms_ease,border-color_150ms_ease] -mb-px hover:text-onsurface-100 ${tab === 'signin' ? 'text-onsurface-100 border-b-onsurface-100' : 'text-onsurface-600 border-b-transparent'}`}
            onClick={() => switchTab('signin')}
          >
            Sign in
          </button>
          <button
            className={`flex-1 py-2 px-4 text-[13px] font-bold tracking-[0.5px] bg-transparent border-none cursor-pointer border-b-2 transition-[color_150ms_ease,border-color_150ms_ease] -mb-px hover:text-onsurface-100 ${tab === 'signup' ? 'text-onsurface-100 border-b-onsurface-100' : 'text-onsurface-600 border-b-transparent'}`}
            onClick={() => switchTab('signup')}
          >
            Create account
          </button>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
          {tab === 'signup' && (
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="auth-name" className="text-[11px] font-bold tracking-[0.3px] text-onsurface-500">Full name</label>
              <input
                id="auth-name"
                ref={tab === 'signup' ? firstInputRef : null}
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
                className={fieldInputCls}
              />
            </div>
          )}

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="auth-email" className="text-[11px] font-bold tracking-[0.3px] text-onsurface-500">Email address</label>
            <input
              id="auth-email"
              ref={tab === 'signin' ? firstInputRef : null}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={fieldInputCls}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="auth-password" className="text-[11px] font-bold tracking-[0.3px] text-onsurface-500">Password</label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPwd ? 'text' : 'password'}
                placeholder={tab === 'signup' ? 'Min. 6 characters' : 'Your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                className={`${fieldInputCls} pr-12`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent border-none cursor-pointer p-0 text-onsurface-500 transition-[color_150ms_ease] hover:text-onsurface-100"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          {tab === 'signup' && (
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="auth-confirm" className="text-[11px] font-bold tracking-[0.3px] text-onsurface-500">Confirm password</label>
              <input
                id="auth-confirm"
                type={showPwd ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                className={fieldInputCls}
              />
            </div>
          )}

          {error && (
            <p className="text-[0.8rem] text-danger bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.25)] py-3 px-4 leading-[1.5]" role="alert">
              ⚠ {error}
            </p>
          )}

          <button
            type="submit"
            className={`btn btn-red w-full justify-center py-3 text-[13px] normal-case tracking-[0.2px] mt-[2px] relative rounded-[8px]${tab === 'signin' ? ' mt-4' : ''}${loading ? ' opacity-70 cursor-not-allowed transform-none! after:content-[\'\'] after:absolute after:right-4 after:top-1/2 after:[transform:translateY(-50%)] after:w-4 after:h-4 after:border-2 after:border-[rgba(255,255,255,0.3)] after:border-t-white after:rounded-full after:animate-[spin_0.7s_linear_infinite]' : ''}`}
            disabled={loading}
          >
            {loading
              ? 'Please wait…'
              : tab === 'signin' ? 'Sign in' : 'Create account'}
          </button>

          <p className="text-center text-[0.8rem] text-onsurface-600">
            {tab === 'signin' ? (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => switchTab('signup')} className="bg-transparent border-none text-onsurface-100 cursor-pointer [font-size:inherit] font-semibold p-0 underline underline-offset-2 hover:text-gold-dark">Sign up free</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => switchTab('signin')} className="bg-transparent border-none text-onsurface-100 cursor-pointer [font-size:inherit] font-semibold p-0 underline underline-offset-2 hover:text-gold-dark">Sign in</button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
