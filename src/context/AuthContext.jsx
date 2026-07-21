import { createContext, useContext, useState, useCallback } from 'react';
import { login, register, logout as logoutRequest } from '../api/authService';
import { getToken } from '../api/token';

const AuthContext = createContext(null);

const USER_KEY = 'kws_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      if (!getToken()) return null;
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [authModal, setAuthModal] = useState({ open: false, tab: 'signin' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openSignIn  = useCallback(() => setAuthModal({ open: true, tab: 'signin' }),  []);
  const openSignUp  = useCallback(() => setAuthModal({ open: true, tab: 'signup' }),  []);
  const closeModal  = useCallback(() => setAuthModal(prev => ({ ...prev, open: false })), []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const safeUser = await login(email, password);
      localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
      setUser(safeUser);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const safeUser = await register(name, email, password);
      localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
      setUser(safeUser);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logoutRequest();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout, openSignIn, openSignUp, closeModal, authModal, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
